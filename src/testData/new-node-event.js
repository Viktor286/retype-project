export default `const Event = require("events");
const myEvent = new Event();

const display = data => {
\tconsole.log("superEvent data ", data);
\treturn true;
};

myEvent.on("superEvent", data => display(data));
myEvent.emit("superEvent", "12345");`;
