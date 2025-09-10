import { classnames } from '@lib';

const Shape = ({ extraClass }) => {
  return (
    <span id="pgn-shape" className={classnames('text-xs text-green-400 mr-1', extraClass)}>
      <i className="fas fa-shapes"></i>
    </span>
  );
};

export default Shape;
