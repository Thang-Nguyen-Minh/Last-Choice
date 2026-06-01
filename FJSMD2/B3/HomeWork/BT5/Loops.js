let number;

do{
    number = Number(prompt("Nhập một số trong khoảng từ 1 đến 10:"));
}while (number > 10 || number < 1 || isNaN(number));

console.log("Số hợp lệ đã nhập ", number)