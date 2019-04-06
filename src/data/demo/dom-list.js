export default `const body = document.getElementsByTagName("body")[0];
const ulElement = document.createElement("ul");

let ul = body.appendChild(ulElement);

const list = [
\t{ text: "First line" },
\t{ text: "Second line" },
\t{ text: "Third line over here" }
];

for (let [n, li] of Object.entries(list)) {
\tconst liNode = document.createElement("li");
\tliNode.innerHTML = li.text;
\tliNode.id = n;
\tconst currentListItem = ul.appendChild(liNode);
\tcurrentListItem.addEventListener("click", e =>
\t\tconsole.log("e.currentTarget.id ", e.currentTarget.id)
\t);
}`;
