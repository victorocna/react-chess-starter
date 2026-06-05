import { getMoveNumber, isMoveActive } from '@chess/functions';

const buildPgnMobileStrip = (mainlineMoments = [], current) => {
  const moves = mainlineMoments.filter((moment) => moment.move);

  return moves.reduce((items, moment, index) => {
    const prev = moves[index - 1];
    const isWhiteMove = moment.fen?.split(' ')[1] === 'b';
    const prevWasWhite = prev?.fen?.split(' ')[1] === 'b';

    if (isWhiteMove) {
      items.push({
        key: `n-${moment.index}`,
        text: `${getMoveNumber(moment.fen)}.`,
        type: 'number',
      });
    } else if (!prev || !prevWasWhite) {
      items.push({ key: `e-${moment.index}`, text: '...', type: 'ellipsis' });
    }

    items.push({
      active: isMoveActive(current, moment),
      key: `m-${moment.index}`,
      moment,
      text: moment.move,
      type: 'move',
    });

    return items;
  }, []);
};

export default buildPgnMobileStrip;
