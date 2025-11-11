import { classnames } from '@lib';

const EngineProgressBar = ({ nodes, maxNodes = 2250000 }) => {
  const progress = Math.min((nodes / maxNodes) * 100, 100);
  const showProgress = nodes > 0;
  const isAnalyzing = nodes > 0 && nodes < maxNodes;

  if (!showProgress) {
    return null;
  }

  return (
    <div id="engine-progress-bar" className="absolute top-0 left-0 right-0 h-0.5 bg-gray-700">
      <div
        className={classnames(
          'h-full bg-green-600 transition-all duration-300',
          isAnalyzing && 'animate-pulse'
        )}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default EngineProgressBar;
