import { Engine } from ".";

const Analysis = ({ current, isAnalysisOpen, numLines = 1, memory = 256 }) => {
  if (!isAnalysisOpen) {
    return null;
  }

  return (
    <div id="engine-analysis" className="flex flex-col text-gray-800 text-sm bg-white">
      <Engine fen={current?.fen} numLines={numLines} memory={memory} />
    </div>
  );
};

export default Analysis;
