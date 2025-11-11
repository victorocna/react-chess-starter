const getRangeBackgroundStyle = (value, max) => {
  const percentage = (value / max) * 100;
  return `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #4b5563 ${percentage}%, #4b5563 100%)`;
};

export default getRangeBackgroundStyle;
