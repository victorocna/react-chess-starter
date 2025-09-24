import { timeControlOptions } from '@chess/constants/time-control-options';

const TimeControlDropdown = ({ selectedTimeControl, onTimeControlChange }) => {
  const handleChange = (e) => {
    const selectedOption = timeControlOptions.find((option) => option.value === e.target.value);
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
      <label className="text-sm font-medium text-gray-700">Time Control</label>
      <select
        value={selectedTimeControl || 'unlimited'}
        onChange={handleChange}
        className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {timeControlOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeControlDropdown;
