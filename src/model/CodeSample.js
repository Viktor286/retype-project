export default function CreateCodeSample({ title, content, mainCategory, alias, html_url }) {
  const adjustedContent = decodeURIComponent(escape(window.atob(content))).replaceAll('  ', '\t');
  const contentAsArray = adjustedContent.split("");
  const contentLen = contentAsArray.length;

  return {
    id: Math.random().toString(36).slice(2),
    title,
    alias,
    mainCategory,
    content: adjustedContent,
    contentAsArray,
    contentLen,
    createdAt: new Date().getTime(),
    html_url
  };
}

