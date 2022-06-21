export function splitTextLines(text) {
  let result = [];
  let lineStart = 0;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') {
      result.push(text.slice(lineStart, i + 1));
      lineStart = i + 1;
    }
  }
  return result;
}

export function spacesIntoTabs(contentAsLines) {
  return contentAsLines.map((line) => {
    let firstChar = 0;
    while (firstChar < line.length) {
      if (line[firstChar] === ' ') {
        firstChar++;
      } else {
        break;
      }
    }

    const spacesLine = line.slice(0, firstChar);
    const tabsLine = spacesLine.replaceAll('  ', '\t');

    return tabsLine.concat(line.slice(firstChar, line.length));
  });
}
