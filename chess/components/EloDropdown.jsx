import { eloOptions as defaultEloOptions } from '@chess/constants/elo-options';

const EloDropdown = ({
  selectedElo,
  onEloChange,
  options = defaultEloOptions,
  label = 'Bot selection',
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        value={selectedElo}
        onChange={(e) => onEloChange(Number(e.target.value))}
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

export default EloDropdown;
