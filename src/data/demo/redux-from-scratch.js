export default `const createStore = reducer => {
\tlet state;
\tlet listeners = [];

\tconst getState = () => state;

\tconst dispatch = action => {
\t\tstate = Object.assign(
\t\t\tstate === undefined ? {} : state,
\t\t\treducer(state, action)
\t\t);
\t\tlisteners.forEach(listener => listener());
\t};

\tconst subscribe = listener => {
\t\tlisteners.push(listener);
\t\treturn () => (listeners = listeners.filter(l => l !== listener));
\t};

\tdispatch({}); // init default state
\treturn { getState, dispatch, subscribe };
};

const defaultState = { cnt: 0, title: "initial" };
let store = createStore((state = defaultState, modificationDescription) => {
\tswitch (modificationDescription.type) {
\t\tcase "INC":
\t\t\treturn { cnt: state.cnt + 1 };
\t\tcase "DEC":
\t\t\treturn { cnt: state.cnt - 1 };
\t\tdefault:
\t\t\treturn state;
\t}
});

store.subscribe(() => console.log("store.getState() ", store.getState()));
store.dispatch({ type: "INC" });
`;
