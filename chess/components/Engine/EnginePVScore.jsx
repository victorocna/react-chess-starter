import { formatEngineScore } from '@chess/functions';

const EnginePVScore = ({ type, value }) => {
  const score = formatEngineScore(type, value);
  const isPositive = !score.startsWith('-');

  return (
    <span className="font-bold mr-2">
      {isPositive ? '+' : ''}
      {score}
    </span>
  );
};

export default EnginePVScore;
