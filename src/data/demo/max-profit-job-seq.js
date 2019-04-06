export default `let jobs = [[3, 35], [4, 30], [4, 25], [2, 20], [3, 15], [1, 12], [2, 5]];
const maxDeadLine = 4;

function getMaxProfitOfJobSeqWithDeadline(jobs, maxDeadLine) {
\tlet timeSlots = Array(maxDeadLine);
\tlet maxProfit = 0;
\tlet itCnt = 0;

\tmainPass: for (let i = 0; i < jobs.length; i++) {
\t\titCnt++;
\t\tfor (let j = timeSlots.length - 1; j >= 0; j--) {
\t\t\titCnt++;
\t\t\tif (!timeSlots[j]) {
\t\t\t\ttimeSlots[j] = jobs[i];

\t\t\t\tif (j === 0) {
\t\t\t\t\tfor (let slot of timeSlots) {
\t\t\t\t\t\tmaxProfit += slot[1]
\t\t\t\t\t}
\t\t\t\t\tbreak mainPass;
\t\t\t\t}

\t\t\t\tbreak;
\t\t\t}
\t\t}

\t}

\tconsole.log('itCnt ', itCnt);
\tconsole.log('timeSlots ', timeSlots);
\treturn maxProfit;
}`;
