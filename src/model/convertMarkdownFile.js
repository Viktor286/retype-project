// This is MVP for supporting basic interpretation for .MD files
// As a base feature it only extracts the code for limited number of
// supported extensions. In future, the supported extensions probably
// should be handled via remote API.
// Currently all the langs handled as Javascript language syntax for simplicity,
// which also could be extended in future.

const supportedExt = ['css', 'jsx', 'js', 'ts', 'py', 'shell'];

function isParsingStringOpen(line) {
  for (let i = 0; i < supportedExt.length; i++) {
    if (line.startsWith('```' + supportedExt[i])) {
      return true;
    }
  }
  return false;
}

export default function convertMarkdownFile(contentAsLines, fileName) {
  const ext = fileName.split('.').pop();

  if (ext === 'md') {
    let isTagOpen = false;
    const filteredTextLines = [];
    for (let i = 0; i < contentAsLines.length; i++) {
      if (contentAsLines[i].startsWith('```\n')) {
        isTagOpen = false;
        filteredTextLines.push('\n');
      }
      if (isTagOpen) filteredTextLines.push(contentAsLines[i]);
      if (isParsingStringOpen(contentAsLines[i])) isTagOpen = true;
    }
    contentAsLines = filteredTextLines;
  }

  return contentAsLines;
}
