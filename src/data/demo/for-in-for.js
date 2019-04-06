export default `for(let i=0; i<nums.length; i++){
\tif (nums[i]===0){
\t\treturn nums[i];
\t} else {
\t\tfor (let i=0; i < nums.length; i++) {
\t\t\tif(nums[i] >= 0){
\t\t\t\treturn nums[i];
\t\t\t}
\t\t}
\t}
}`;
