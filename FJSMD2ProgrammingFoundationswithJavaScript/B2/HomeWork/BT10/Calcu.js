let a = Number(prompt("Nhập số thứ (A)"));
let b = Number(prompt("Nhập số thứ (B)"));
let operator=prompt("Nhập phép tính (+,-,*,/):");
let result;

if (operator === "+") {
    result=a+b;
}
else if (operator === "-") {
    result = a-b;
}
else if (operator === "*") {
    result = a*b;
}
else if (operator === "/") {
    result = b!==0 ? a/b : "Lỗi (không thể chia cho 0)";
}
else{
    result = "Phép tính không hợp lệ";
}

console.log(`Kết quả của [${a}] [${operator}] [${b}] là: ${result}`);