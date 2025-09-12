import { useState, useEffect } from 'react';
import { useEngine } from '.';
import { useDisclosure } from '@hooks';

const reverseFenColor = (fen) => {
  return fen?.includes(' w ') ? fen.replace(' w ', ' b ') : fen.replace(' b ', ' w ');
};

const normalizeThreatMessage = (threatMessage) => {
  const fromTo = threatMessage?.split(' ')?.[1];
  if (!fromTo) return;

  const shapeOrigin = fromTo.slice(0, 2);
  const shapeDestination = fromTo.slice(2, 4);

  return { orig: shapeOrigin, dest: shapeDestination, brush: 'red' };
};

const useThreat = (initialFen) => {
  const { isOpen: isActive, show, hide, toggle } = useDisclosure();
  const handleToggle = () => {
    setThreatShape(null);
    toggle();
  };
  const handleShow = () => {
    setThreatShape(null);
    show();
  };
  const handleHide = () => {
    setThreatShape(null);
    hide();
  };

  const engine = useEngine();
  const [fen, setFen] = useState(initialFen);
  const [threatShape, setThreatShape] = useState(null);
  useEffect(() => {
    if (isActive) {
      sendPositionToEngine(fen);
    }
  }, [isActive, fen]);

  const sendPositionToEngine = async (fen) => {
    setThreatShape(null);

    await engine.stop();
    await engine.is_ready();

    // to show the threat, we need to set the position as if it's the other player's turn
    engine.set_position(reverseFenColor(fen));
    const rawThreatMessage = await engine.go_depth(15);

    setThreatShape(normalizeThreatMessage(rawThreatMessage));
  };

  return {
    threatShape,
    isThreatActive: isActive,
    showThreat: handleShow,
    hideThreat: handleHide,
    toggleThreat: handleToggle,
    setThreatFen: setFen,
  };
};

export default useThreat;
