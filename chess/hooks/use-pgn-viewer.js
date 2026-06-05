import { coffee } from '@functions';
import { getMainlineMoments, getSideToMove } from '@chess/functions';
import {
  addMomentToTree,
  tree as chessTree,
  findInsertedMoment,
  getNextMoments,
  getPrevMoment,
  momentsToPgn,
} from 'chess-moments';
import { flatten, isEmpty, last } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';

const defaultMoment = { fen: '', shapes: [] };

const getFallbackMoment = (moments, startAtLastMove) => {
  if (startAtLastMove) {
    return moments[moments.length - 1] || defaultMoment;
  }

  return moments[0] || defaultMoment;
};

const findMatchingMoment = (moments, moment) => {
  if (!moment) {
    return null;
  }

  return (
    moments.find((nextMoment) => nextMoment.id && nextMoment.id === moment.id) ||
    moments.find(
      (nextMoment) => nextMoment.fen === moment.fen && nextMoment.index === moment.index
    ) ||
    moments.find((nextMoment) => nextMoment.fen === moment.fen) ||
    null
  );
};

const isRootMoment = (moment) => {
  return !!moment && !moment.move && moment.index === 0;
};

const usePgnViewer = (pgn, options) => {
  const {
    autoSelectMainline = false,
    initialMoveIndex = 0,
    initialOrientation = 'white',
    resetKey,
    startAtLastMove = false,
    useArrowsToMove = true,
    useFlipShortcut = true,
  } = options || {};

  // === PGN state and navigation
  const [treeState, setTree] = useState(chessTree(pgn));
  const moments = useMemo(() => {
    return flatten(treeState);
  }, [treeState]);

  // Memoized PGN state
  const pgnState = useMemo(() => {
    return momentsToPgn(moments);
  }, [moments]);

  const firstMoment = useMemo(() => moments[0], [moments]);
  const lastMoment = useMemo(() => moments[moments.length - 1], [moments]);

  const mainlineMoments = useMemo(() => getMainlineMoments(treeState), [treeState]);
  const firstTurn = useMemo(() => getSideToMove(firstMoment?.fen), [firstMoment]);
  const effectiveResetKey = resetKey ?? pgn;

  const [currentMoment, setCurrentMoment] = useState(
    getFallbackMoment(flatten(treeState), startAtLastMove)
  );
  const [variations, setVariations] = useState(null);
  const [userMoves, setUserMoves] = useState(null);
  const [orientation, setOrientation] = useState(initialOrientation);

  // Prevent rerendering issues by using the current moment's FEN in React state
  const [fen, setFen] = useState(currentMoment?.fen);
  const currentMomentRef = useRef(currentMoment);
  const previousPgnRef = useRef(pgn);
  const resetKeyRef = useRef(effectiveResetKey);
  const previousInitialOrientationRef = useRef(initialOrientation);

  useEffect(() => {
    currentMomentRef.current = currentMoment;
  }, [currentMoment]);

  // Keep the current node during same-chapter PGN syncs, but reset on chapter changes.
  useEffect(() => {
    const newTree = chessTree(pgn);
    const newMoments = flatten(newTree);
    const didResetKeyChange = resetKeyRef.current !== effectiveResetKey;
    const fallbackMoment = getFallbackMoment(newMoments, startAtLastMove);
    const shouldResetToLastMove =
      startAtLastMove &&
      !previousPgnRef.current &&
      isRootMoment(currentMomentRef.current) &&
      newMoments.length > 1;
    const preservedMoment =
      didResetKeyChange || shouldResetToLastMove
        ? null
        : findMatchingMoment(newMoments, currentMomentRef.current);
    const targetMoment = preservedMoment || fallbackMoment;

    const didInitialOrientationChange =
      previousInitialOrientationRef.current !== initialOrientation;

    previousPgnRef.current = pgn;
    resetKeyRef.current = effectiveResetKey;
    previousInitialOrientationRef.current = initialOrientation;

    setTree(newTree);
    setCurrentMoment(targetMoment);
    setFen(targetMoment.fen);
    if (didResetKeyChange || didInitialOrientationChange) {
      setOrientation(initialOrientation || 'white');
    }
    setVariations(null);
    setUserMoves(null);
  }, [effectiveResetKey, pgn, startAtLastMove, initialOrientation]);

  useEffect(() => {
    if (initialMoveIndex === 0 || moments.length <= initialMoveIndex) {
      if (!currentMoment) {
        const targetMoment = startAtLastMove ? lastMoment : firstMoment;
        setCurrentMoment(targetMoment || defaultMoment);
      }
    } else {
      const mainLineMoves = moments.filter((move) => move.depth === 1 && move.move);
      const fallbackMoment = startAtLastMove ? lastMoment : firstMoment;
      const targetMove = mainLineMoves[initialMoveIndex] || fallbackMoment || defaultMoment;
      setCurrentMoment(targetMove);
    }
    setVariations(null);
    setUserMoves(null);
  }, [initialMoveIndex, moments]);

  const goPrevMoment = () => {
    const prevMoment = getPrevMoment(moments, currentMoment);
    if (!isEmpty(prevMoment)) {
      setCurrentMoment(prevMoment);
      setFen(prevMoment?.fen);
      setVariations(null);
      setUserMoves(null);
    }
  };

  const canGoPrev = useMemo(() => {
    return !isEmpty(getPrevMoment(moments, currentMoment));
  }, [currentMoment, moments]);

  const goNextMoment = () => {
    const nextMoments = getNextMoments(moments, currentMoment);
    if (isEmpty(nextMoments)) {
      return;
    }
    if (nextMoments.length === 1 || autoSelectMainline) {
      setCurrentMoment(nextMoments[0]);
      setFen(nextMoments[0]?.fen);
      setVariations(null);
      setUserMoves(null);
    } else if (nextMoments.length > 1) {
      setVariations(nextMoments);
    }
  };

  const canGoNext = useMemo(() => {
    return !isEmpty(getNextMoments(moments, currentMoment));
  }, [currentMoment, moments]);

  const goToMoment = (moment) => {
    setCurrentMoment(moment);
    setFen(moment?.fen);
    setVariations(null);
    setUserMoves(null);
  };

  const goToStart = () => {
    if (firstMoment) {
      setCurrentMoment(firstMoment);
      setFen(firstMoment?.fen);
      setVariations(null);
      setUserMoves(null);
    }
  };

  const goToEnd = () => {
    if (lastMoment) {
      setCurrentMoment(lastMoment);
      setFen(lastMoment?.fen);
      setVariations(null);
      setUserMoves(null);
    }
  };

  const getMoveIndex = (moment) => {
    if (!moment || !moments.length) {
      return 0;
    }
    const mainLineMoves = moments.filter((move) => move.depth === 1 && move.move);
    const moveIndex = mainLineMoves.findIndex((move) => move.id === moment.id);
    return moveIndex >= 0 ? moveIndex : 0;
  };

  // == Variations
  const handleVariationChoice = async (moveIndex) => {
    setCurrentMoment(moments[moveIndex]);
    await coffee(10); // Simulate a delay for the variations to update
    setVariations(null);
    setUserMoves(null);
  };

  const handleVariationsCancel = () => {
    setVariations(null);
    setUserMoves(null);
  };

  const syncLastMove = (fen) => {
    const existingMoment = moments.find((m) => m.fen === fen);
    if (existingMoment) {
      setCurrentMoment(existingMoment);
      setFen(existingMoment.fen);
    }
  };

  const handleUserMove = (chess) => {
    const userMove = last(chess.history({ verbose: true }));
    const newTree = addMomentToTree(treeState, userMove);

    // Update the tree and current moment
    setTree(newTree);
    const newMoment = findInsertedMoment(newTree);
    if (newMoment) {
      setCurrentMoment(newMoment);
      setFen(newMoment.fen);
    } else {
      syncLastMove(chess.fen());
    }
  };

  const handleUserMovesReset = () => {
    setUserMoves(null);
    goNextMoment();
  };

  const flipOrientation = () => {
    setOrientation((o) => (o === 'white' ? 'black' : 'white'));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!variations && useArrowsToMove) {
        if (event.key === 'ArrowLeft') {
          goPrevMoment();
        }
        if (event.key === 'ArrowRight') {
          goNextMoment();
        }
      }
      if (useFlipShortcut && (event.key === 'f' || event.key === 'F')) {
        const tag = event.target.tagName;
        if (tag !== 'INPUT' && tag !== 'TEXTAREA' && !event.target.isContentEditable) {
          flipOrientation();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [goPrevMoment, goNextMoment, variations, flipOrientation, useFlipShortcut]);

  // Create lastMove array from current moment's from/to properties
  const lastMove = useMemo(() => {
    return currentMoment?.from && currentMoment?.to ? [currentMoment.from, currentMoment.to] : null;
  }, [currentMoment]);

  return {
    fen,
    pgn: pgnState,
    tree: treeState,
    setTree,
    moments,
    mainlineMoments,
    currentMoment,
    current: currentMoment,
    firstTurn,
    lastMove,
    firstMoment,
    lastMoment,
    canGoPrev,
    canGoNext,
    goPrevMoment,
    goNextMoment,
    goToMoment,
    goToStart,
    goToEnd,
    getMoveIndex,
    syncLastMove,

    orientation,
    flipOrientation,

    variations,
    onVariationChoice: handleVariationChoice,
    onVariationsCancel: handleVariationsCancel,

    userMoves,
    onUserMove: handleUserMove,
    onUserMovesReset: handleUserMovesReset,
  };
};

export default usePgnViewer;
