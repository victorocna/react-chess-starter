import React from 'react';

const isLineActive = (array, currentIndex, depth) => {
  for (let i = currentIndex + 1; i < array.length; i++) {
    const nextBlockDepth = array[i][0]?.depth;
    if (nextBlockDepth === depth) return true;
    if (nextBlockDepth < depth) return false;
  }
  return false;
};

const PgnTreeLines = ({ tree, blockIndex, currentDepth }) => {
  if (currentDepth <= 1) return null;

  const lines = [];
  for (let d = 2; d <= currentDepth; d++) {
    const isActive = isLineActive(tree, blockIndex, d);
    const isCurrent = d === currentDepth;
    const leftPos = `${(d - 2) * 0.75}rem`;

    if (isCurrent) {
      if (isActive) {
        lines.push(
          <div
            key={`line-${d}`}
            className="absolute top-0 bottom-0 w-3 border-l-2 border-gray-400"
            style={{ left: leftPos }}
          />
        );
        lines.push(
          <div
            key={`connector-${d}`}
            className="absolute top-3 w-3 border-b-2 border-gray-400"
            style={{ left: leftPos }}
          />
        );
      } else {
        lines.push(
          <div
            key={`line-${d}`}
            className="absolute top-0 h-3 w-3 border-l-2 border-b-2 border-gray-400 rounded-bl-sm"
            style={{ left: leftPos }}
          />
        );
      }
    } else {
      if (isActive) {
        lines.push(
          <div
            key={`pass-${d}`}
            className="absolute top-0 bottom-0 w-0 border-l-2 border-gray-400"
            style={{ left: leftPos }}
          />
        );
      }
    }
  }
  return <>{lines}</>;
};

export default PgnTreeLines;
