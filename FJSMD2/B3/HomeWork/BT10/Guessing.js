let random = Math.floor(Math.random() * 100) + 1;
let isCorrect = false;

for (let i = 1; i <= 5; i++) {
    let x=prompt("Nhập số dự đoán");
    if (x === random){
        alert("Chúc mừng");
        console.log("Chúc mừng")
        isCorrect = true;
        break;
    }
    else if (x > random){
        alert("Số bạn đoán quá lớn")
        console.log("Số bạn đoán quá lớn")
    }
    else {
        alert("Số bạn đoán quá nhỏ")
        console.log("Số bạn đoán quá nhỏ")
    }
}
if (!isCorrect){
    alert(random);
    console.log("Game Over");
}