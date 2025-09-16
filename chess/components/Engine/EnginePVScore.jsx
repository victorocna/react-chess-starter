import { formatEngineScore } from '@chess/functions';

const EnginePVScore = ({ type, value }) => {
  return <span className="font-semibold mr-1">({formatEngineScore(type, value)})</span>;
};

export default EnginePVScore;
