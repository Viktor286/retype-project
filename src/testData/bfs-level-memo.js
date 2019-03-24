export default `function levelOrder(root) {
\tif (root) {
\t\tlet q = [root];
\t\tlet BSF_List = [];

\t\twhile (q.length) {
\t\t\tlet levelNodesAmount = q.length;
\t\t\tlet levelNodeHistory = [];

\t\t\twhile (levelNodesAmount > 0) {
\t\t\t\tconst node = q.pop();
\t\t\t\tif (node.left) q.unshift(node.left);
\t\t\t\tif (node.right) q.unshift(node.right);
\t\t\t\tlevelNodeHistory.push(node.val);
\t\t\t\t--levelNodesAmount;
\t\t\t}

\t\t\tBSF_List.push(levelNodeHistory);
\t\t}

\t\treturn BSF_List;
\t} else {
\t\treturn [];
\t}
}`;