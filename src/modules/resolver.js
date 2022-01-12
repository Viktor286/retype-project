// Fallback for resolver
const r = process.env.REACT_APP_RESOLVER;
const resolver = r ? require(r + '').default : (a) => {
  const e = new Array(a.length);
  for (let i = 0; i < a.length; i++) {e[i] = [{ltRange: [0, a[i].length]}]}
  return e;
};
export default resolver;
