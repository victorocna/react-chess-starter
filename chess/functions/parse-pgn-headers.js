const parsePgnHeaders = (pgn) => {
  const headers = {};

  if (!pgn || typeof pgn !== 'string') {
    return headers;
  }

  // Split into lines and process each header line
  const lines = pgn.split('\n');

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Check if line is a header (starts with [ and ends with ])
    if (trimmedLine.startsWith('[') && trimmedLine.endsWith(']')) {
      const headerContent = trimmedLine.slice(1, -1);
      const spaceIndex = headerContent.indexOf(' ');

      if (spaceIndex > 0) {
        const tagName = headerContent.substring(0, spaceIndex);
        const tagValue = headerContent.substring(spaceIndex + 1);

        const cleanValue = tagValue.replace(/^"(.*)"$/, '$1');

        headers[tagName] = cleanValue;
      }
    }
  }

  return headers;
};

export default parsePgnHeaders;
