export function splitTextLines(text) {
  let line = '';
  let result = [];

  for (let i = 0; i < text.length; i++) {
    line += text[i];
    if (text[i] === '\n') {
      result.push(line);
      line = '';
    }
  }

  return result;
}
