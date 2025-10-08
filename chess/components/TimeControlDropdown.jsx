import { timeControlOptions as defaultTimeControlOptions } from '@chess/constants/time-control-options';

const TimeControlDropdown = ({
  selectedTimeControl,
  onTimeControlChange,
  options = defaultTimeControlOptions,
  label = 'Time Control',
}) => {
  const handleChange = (e) => {
    const selectedOption = options.find((option) => option.value === e.target.value);
    if (onTimeControlChange && selectedOption) {
      onTimeControlChange({
        value: selectedOption.value,
        minutes: selectedOption.minutes,
        increment: selectedOption.increment,
        label: selectedOption.label,
      });
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        value={selectedTimeControl || options[0]?.value}
        onChange={handleChange}
        className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeControlDropdown;
