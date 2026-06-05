import { flatten } from 'lodash';

const getMainlineMoments = (moments) => {
  const flatMoments = flatten(moments);

  const mainlineMoments = flatMoments.filter((move) => {
    return move.depth === 1 && (move.move || move.index === 0);
  });

  return mainlineMoments;
};

export default getMainlineMoments;
