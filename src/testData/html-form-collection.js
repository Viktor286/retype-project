export default `const formArr = [].map.call(document.forms[0].elements, elm => {
\tif(elm.type === "radio" || elm.type === "checkbox"){
\t\tif(elm.checked) {
\t\t\treturn [elm.name, elm.value];
\t\t}
\t}
\t
\tif(elm.type === "text" || elm.type === "select-one"){
\t\treturn [elm.name, elm.value];
\t}
}).filter(a => a ? a : false);`;