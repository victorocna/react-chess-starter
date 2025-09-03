import { compact } from 'lodash';
import { useState } from 'react';
import useVariationArrows from './use-variation-arrows';

const useShapes = ({ userMoves, current, variations }) => {
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);

  const variationArrow = useVariationArrows(current, variations, selectedVariationIndex);

  // Collect shapes from the current moment and variation arrows
  const shapesArray = [];
  if (!userMoves && current.shapes) {
    shapesArray.push(...current.shapes);
  }

  // Add the variation arrow to the shapes array
  const shapes = compact([...shapesArray, variationArrow]);

  return { shapes, refocusModal: setSelectedVariationIndex };
};

export default useShapes;
