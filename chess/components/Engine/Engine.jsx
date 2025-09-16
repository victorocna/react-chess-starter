import { useEffect, useState } from 'react';
import { useEngine } from '@chess/hooks';
import { EnginePV } from '.';

const Engine = ({ fen }) => {
  const engine = useEngine();
  const [infoMessage, setInfoMessage] = useState();

  const sendPositionToEngine = async (fen) => {
    await engine.stop();
    await engine.is_ready();
    engine.set_position(fen);
    engine.go_infinite(setInfoMessage);
  };

  useEffect(() => {
    setInfoMessage({});
    sendPositionToEngine(fen);
  }, [fen]);

  return (
    <div className="text-sm">
      <div className="flex justify-between">
        <span className="font-semibold">Stockfish</span>
        <span>
          depth: <b>{infoMessage?.depth ?? '-'}</b>
        </span>
      </div>
      <EnginePV position={fen} {...infoMessage} />
    </div>
  );
};

export default Engine;
