import { getRangeBackgroundStyle } from '@chess/functions';

const RangeSlider = ({ label, value, max, unit, onChange }) => {
  const handleChange = (e) => {
    onChange(parseInt(e.target.value, 10));
  };

  return (
    <div id="engine-range-slider">
      <div className="flex justify-between items-center mb-2">
        <label className="text-gray-700 text-sm font-medium">{label}</label>
        <span className="text-gray-700 text-sm font-semibold">
          {value} {unit && `/ ${unit}`}
        </span>
      </div>
      <input
        type="range"
        min="1"
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
        style={{ background: getRangeBackgroundStyle(value - 1, max - 1) }}
      />
    </div>
  );
};

export default RangeSlider;
