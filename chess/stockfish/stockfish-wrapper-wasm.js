import { constants } from 'next-chessground';

const LITE_MT_PATH = '/lib/stockfish/stockfish-17.1-lite-51f59da.js';
const LITE_ST_PATH = '/lib/stockfish/stockfish-17.1-lite-single-03e3232.js';

const canUseThreads = () => {
  if (typeof window === 'undefined') return false;
  return (
    typeof SharedArrayBuffer !== 'undefined' &&
    typeof globalThis.crossOriginIsolated === 'boolean' &&
    globalThis.crossOriginIsolated === true
  );
};

const isMobileDevice = () => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return /Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
};

const isLowMemoryDevice = () => {
  if (typeof navigator === 'undefined') return false;
  return typeof navigator.deviceMemory === 'number' && navigator.deviceMemory < 4;
};

export const getEnginePath = () => (canUseThreads() ? LITE_MT_PATH : LITE_ST_PATH);

const pickStartupThreads = (threaded) => {
  if (!threaded) return 1;
  const cores = (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || 2;
  const cap = isMobileDevice() ? 2 : 8;
  return Math.max(1, Math.min(cores, cap));
};

const pickStartupHash = () => {
  if (isLowMemoryDevice()) return 16;
  return isMobileDevice() ? 32 : 16;
};

const PREWARM_HANDSHAKE_TIMEOUT_MS = 15000;
const STOP_TIMEOUT_MS = 3000;

class Stockfish {
  constructor(path) {
    if (typeof window === 'undefined') {
      return false;
    }

    this.type = 'wasm';
    this.enginePath = path || getEnginePath();
    this.threaded = this.enginePath === LITE_MT_PATH;

    this.worker = null;
    this.messageHandlers = [];
    this.isReady = false;

    this.maxDepth = 25;
    this.maxNodes = 2250000;
    this.isAnalyzing = false;
    this.fen = constants.initialFen;

    this.hashSize = pickStartupHash();
    this.multiPV = 1;
    this.threads = pickStartupThreads(this.threaded);
  }

  getTurnFromFen(fen) {
    return fen.split(' ')[1];
  }

  normalizeScoreValue(value) {
    const turn = this.getTurnFromFen(this.fen);
    if (turn === 'b') {
      return -1 * value;
    }
    return value;
  }

  isInfoMessage(message) {
    if (!message) return false;
    return message.startsWith('info');
  }

  postMessage(command) {
    if (this.worker) {
      this.worker.postMessage(command);
    }
  }

  async init() {
    return new Promise((resolve, reject) => {
      let settled = false;
      const fail = (err) => {
        if (settled) return;
        settled = true;
        reject(err);
      };
      const timeout = setTimeout(
        () => fail(new Error('Stockfish init timed out')),
        PREWARM_HANDSHAKE_TIMEOUT_MS
      );

      try {
        this.worker = new Worker(this.enginePath);

        this.worker.onmessage = (e) => {
          const message = e.data;
          this.messageHandlers.forEach((handler) => {
            try {
              handler(message);
            } catch (err) {
              console.error('Message handler error:', err);
            }
          });
        };

        this.worker.onerror = (error) => {
          clearTimeout(timeout);
          console.error('Stockfish worker error:', error);
          fail(error);
        };

        const uciHandler = (message) => {
          if (message === 'uciok') {
            this.messageHandlers = this.messageHandlers.filter((h) => h !== uciHandler);

            const readyHandler = (msg) => {
              if (msg === 'readyok') {
                this.messageHandlers = this.messageHandlers.filter((h) => h !== readyHandler);
                clearTimeout(timeout);

                this.postMessage('setoption name Hash value ' + this.hashSize);
                if (this.threaded) {
                  this.postMessage('setoption name Threads value ' + this.threads);
                }

                if (!settled) {
                  settled = true;
                  resolve();
                }
              }
            };

            this.messageHandlers.push(readyHandler);
            this.postMessage('isready');
          }
        };

        this.messageHandlers.push(uciHandler);
        this.postMessage('uci');
      } catch (error) {
        clearTimeout(timeout);
        console.error('Failed to initialize Stockfish:', error);
        fail(error);
      }
    });
  }

  getScoreFromInfo(msg) {
    if (msg.startsWith('info depth 0')) {
      const split = msg.split(' ');
      const type = split[4];
      const value = this.normalizeScoreValue(Number(split[5]));
      this.isAnalyzing = false;
      return { type, value };
    } else if (msg.startsWith('info depth ')) {
      const split = msg.split(' ');
      const scoreIndex = split.indexOf('score');
      if (scoreIndex !== -1) {
        const type = split[scoreIndex + 1];
        const value = this.normalizeScoreValue(Number(split[scoreIndex + 2]));
        return { type, value };
      }
    }
    return { type: 'cp', value: 0 };
  }

  parseData(data) {
    const parts = data.split(' ');
    const depthIndex = parts.indexOf('depth');
    const depth = depthIndex !== -1 ? parts[depthIndex + 1] : '0';

    let pv = '';
    const pvIndex = data.indexOf(' pv ');
    if (pvIndex > -1) {
      const pvSection = data.substring(pvIndex + 4);
      const bmcIndex = pvSection.indexOf(' bmc ');
      pv = bmcIndex > -1 ? pvSection.substring(0, bmcIndex) : pvSection;
    }

    let multipv = 1;
    const multipvIndex = parts.indexOf('multipv');
    if (multipvIndex !== -1) {
      multipv = parseInt(parts[multipvIndex + 1], 10);
    }

    let nodes = 0;
    const nodesIndex = parts.indexOf('nodes');
    if (nodesIndex !== -1) {
      nodes = parseInt(parts[nodesIndex + 1], 10);
    }

    let nps = 0;
    const npsIndex = parts.indexOf('nps');
    if (npsIndex !== -1) {
      nps = parseInt(parts[npsIndex + 1], 10);
    }

    let time = 0;
    const timeIndex = parts.indexOf('time');
    if (timeIndex !== -1) {
      time = parseInt(parts[timeIndex + 1], 10);
    }

    let seldepth = 0;
    const seldepthIndex = parts.indexOf('seldepth');
    if (seldepthIndex !== -1) {
      seldepth = parseInt(parts[seldepthIndex + 1], 10);
    }

    let tbhits = 0;
    const tbhitsIndex = parts.indexOf('tbhits');
    if (tbhitsIndex !== -1) {
      tbhits = parseInt(parts[tbhitsIndex + 1], 10);
    }

    let hashfull = 0;
    const hashfullIndex = parts.indexOf('hashfull');
    if (hashfullIndex !== -1) {
      hashfull = parseInt(parts[hashfullIndex + 1], 10);
    }

    const score = this.getScoreFromInfo(data);
    return {
      depth: parseInt(depth, 10),
      seldepth,
      pv,
      score,
      multipv,
      nodes,
      nps,
      time,
      tbhits,
      hashfull,
    };
  }

  is_ready() {
    return new Promise((resolve) => {
      const handler = (message) => {
        if (message === 'readyok') {
          this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
          resolve(message);
        }
      };
      this.messageHandlers.push(handler);
      this.postMessage('isready');
    });
  }

  set_position(fen) {
    return new Promise((resolve) => {
      this.fen = fen;
      this.postMessage('position fen ' + fen);
      resolve();
    });
  }

  set_multipv(numPv) {
    if (this.multiPV !== numPv) {
      this.multiPV = numPv;
      this.postMessage('setoption name MultiPV value ' + numPv);
    }
  }

  set_hash(hashSize) {
    if (this.hashSize !== hashSize) {
      this.hashSize = hashSize;
      this.postMessage('setoption name Hash value ' + hashSize);
    }
  }

  set_threads(threads) {
    if (!this.threaded) return;
    if (this.threads !== threads) {
      this.threads = threads;
      this.postMessage('setoption name Threads value ' + threads);
    }
  }

  configure(settings = {}) {
    if (settings.hashSize !== undefined) {
      this.set_hash(settings.hashSize);
    }
    if (settings.multiPV !== undefined) {
      this.set_multipv(settings.multiPV);
    }
    if (settings.threads !== undefined) {
      this.set_threads(settings.threads);
    }
  }

  go_infinite(callback) {
    this.isAnalyzing = true;

    const handler = (message) => {
      if (this.isInfoMessage(message) && typeof callback === 'function') {
        callback(this.parseData(message));
      }
    };

    this.messageHandlers.push(handler);
    this.postMessage('go infinite');

    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  }

  // Returns a promise that resolves with the "bestmove ..." UCI string.
  // Used by play mode (ChessBoard) to get the engine's move within a time limit.
  go_time(ms) {
    return new Promise((resolve) => {
      const handler = (message) => {
        if (message.startsWith('bestmove')) {
          this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
          this.isAnalyzing = false;
          resolve(message);
        }
      };
      this.messageHandlers.push(handler);
      this.isAnalyzing = true;
      this.postMessage(`go movetime ${ms}`);
    });
  }

  // Returns a promise that resolves with the "bestmove ..." UCI string.
  // Used by threat detection (use-threat) to find the opponent's best reply.
  go_depth(depth) {
    return new Promise((resolve) => {
      const handler = (message) => {
        if (message.startsWith('bestmove')) {
          this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
          this.isAnalyzing = false;
          resolve(message);
        }
      };
      this.messageHandlers.push(handler);
      this.isAnalyzing = true;
      this.postMessage(`go depth ${depth}`);
    });
  }

  // Configures Stockfish skill level for ELO-matched play.
  updateSkillLevel(skillLevel, maxError, probability) {
    this.postMessage(`setoption name Skill Level value ${skillLevel}`);
    if (maxError !== null && maxError !== undefined) {
      this.postMessage(`setoption name Skill Level Maximum Error value ${maxError}`);
    }
    if (probability !== null && probability !== undefined) {
      this.postMessage(`setoption name Skill Level Probability value ${probability}`);
    }
  }

  // Returns true if the engine should make the first move (e.g. engine plays white but board starts at white's turn).
  shouldMoveFirst(fen, playerColor) {
    const turn = fen.split(' ')[1];
    return (turn === 'w' && playerColor === 'black') || (turn === 'b' && playerColor === 'white');
  }

  newGame() {
    this.postMessage('ucinewgame');
  }

  stop() {
    return new Promise((resolve) => {
      if (!this.isAnalyzing) {
        return resolve();
      }

      let settled = false;
      const finish = (msg) => {
        if (settled) return;
        settled = true;
        this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
        this.isAnalyzing = false;
        resolve(msg);
      };

      const handler = (message) => {
        if (message.startsWith('bestmove')) {
          finish(message);
        }
      };

      this.messageHandlers.push(handler);
      this.postMessage('stop');

      setTimeout(() => finish('bestmove (timeout)'), STOP_TIMEOUT_MS);
    });
  }

  quit() {
    this.messageHandlers = [];
    if (this.worker) {
      this.postMessage('quit');
      this.worker.terminate();
      this.worker = null;
    }
  }
}

export { Stockfish };
