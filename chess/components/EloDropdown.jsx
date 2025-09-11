const EloDropdown = ({ selectedElo, onEloChange }) => {
  const eloOptions = [
    { value: 800, label: 'Beginner (800)' },
    { value: 1000, label: 'Novice (1000)' },
    { value: 1200, label: 'Intermediate (1200)' },
    { value: 1400, label: 'Advanced (1400)' },
    { value: 1600, label: 'Expert (1600)' },
    { value: 1800, label: 'Master (1800)' },
    { value: 2000, label: 'Grandmaster (2000)' },
    { value: 2200, label: 'Super GM (2200)' },
    { value: 2400, label: 'World Class (2400)' },
  ];

  return (
    <select
      value={selectedElo}
      onChange={(e) => onEloChange(Number(e.target.value))}
      className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {eloOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default EloDropdown;
