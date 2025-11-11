import { getRangeBackgroundStyle } from '@chess/functions';

const MemorySlider = ({ label, value, values, onChange }) => {
  const getSliderIndex = () => values.indexOf(value);

  const handleChange = (e) => {
    const index = parseInt(e.target.value, 10);
    onChange(values[index]);
  };

  return (
    <div id="engine-memory-slider">
      <div className="flex justify-between items-center mb-2">
        <label className="text-gray-700 text-sm font-medium">{label}</label>
        <span className="text-gray-700 text-sm font-semibold">{value}MB</span>
      </div>
      <input
        type="range"
        min="0"
        max={values.length - 1}
        step="1"
        value={getSliderIndex()}
        onChange={handleChange}
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
        style={{ background: getRangeBackgroundStyle(getSliderIndex(), values.length - 1) }}
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{values[0]}MB</span>
        <span>{values[values.length - 1]}MB</span>
      </div>
    </div>
  );
};

export default MemorySlider;
