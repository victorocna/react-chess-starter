import { useEffect, useRef, useState } from 'react';

const usePreviewPosition = (lines) => {
  const [hoveredMove, setHoveredMove] = useState(null);
  const [previewPosition, setPreviewPosition] = useState(null);
  const containerRef = useRef(null);

  const calculatePreviewPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPreviewPosition({
        top: rect.bottom + 8,
        left: rect.left + rect.width / 2 - 128, // Center the 256px (w-64) board
      });
    }
  };

  const handleMoveHover = (hoverData) => {
    if (hoverData === null) {
      // Mouse left the moves area - hide preview
      setHoveredMove(null);
      setPreviewPosition(null);
    } else {
      // Update the move data and calculate position
      setHoveredMove(hoverData);
      calculatePreviewPosition();
    }
  };

  // Recalculate position when hoveredMove exists (for expand/collapse changes)
  useEffect(() => {
    if (hoveredMove) {
      calculatePreviewPosition();
    }
  }, [lines]);

  return {
    hoveredMove,
    previewPosition,
    containerRef,
    handleMoveHover,
  };
};

export default usePreviewPosition;
