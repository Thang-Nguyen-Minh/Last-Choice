let numberA=5;
let numberB="5";

console.log("Compare Result (==):", numberA == numberB);   // true (vì JS ép kiểu "5" về 5)
console.log("Compare Result (===):", numberA === numberB); // false (vì khác kiểu dữ liệu: number vs string)

let isUnderstood = confirm("Are you understand?");
console.log("People understand:", isUnderstood);