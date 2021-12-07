export default function CreateCodeSample({ title, content, mainCategory, alias, html_url }) {
  // todo: optimize text adjustment
  const adjustedContent_one = decodeURIComponent(escape(window.atob(content))).replaceAll('  ', '\t');
  const adjustedContent_two = adjustedContent_one.replaceAll(/ *\t */igm, '\t');
  const adjustedContent = adjustedContent_two.replaceAll(/ *\n */igm, '\n');
  const contentAsArray = adjustedContent.split("");
  const contentLen = contentAsArray.length;

  return {
    id: Math.random().toString(36).slice(2),
    title,
    alias,
    mainCategory,
    content: adjustedContent,
    contentAsArray,
    // skipArray: Array(17).fill(0).concat(Array(67).fill(1)).concat(Array(1).fill(0)).concat(Array(50).fill(1)),
    skipArray: [],
    contentLen,
    createdAt: new Date().getTime(),
    html_url
  };
}
