import { classnames } from '@lib';

const Shape = ({ extraClass }) => {
  return (
    <span
      id="pgn-shape"
      className={classnames(
        'inline-block w-3 h-3 rounded-full border-2 border-green-400 ml-1 flex-shrink-0 self-center',
        extraClass
      )}
    />
  );
};

export default Shape;
