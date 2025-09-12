const reverseFenColor = (fen) => {
  return fen?.includes(' w ') ? fen.replace(' w ', ' b ') : fen.replace(' b ', ' w ');
};

export default reverseFenColor;
