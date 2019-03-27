export default `const obj = {
\tlog: ["example", "test"],
\tget latest() {
\t\tif (this.log.length === 0) return undefined;
\t\treturn this.log[this.log.length - 1];
\t}
};
console.log(obj.latest); // "test".
delete obj.latest;

const o = { a: 0 };
Object.defineProperty(o, "b", {
\tget: function() {
\t\treturn this.a + 1;
\t}
});
console.log(o.b);

const expr = "foo";
const obj2 = {
\tget [expr]() {
\t\treturn "bar";
\t}
};
console.log(obj2.foo); // "bar"

class Example {
\tget hello() {
\t\treturn "world";
\t}
}

const obj3 = new Example();
console.log(obj3.hello); // "world"
console.log(Object.getOwnPropertyDescriptor(obj3, "hello")); // undefined
console.log(
\tObject.getOwnPropertyDescriptor(Object.getPrototypeOf(obj3), "hello")
);
`;
