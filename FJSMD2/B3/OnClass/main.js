const input = require('prompt-sync')();
//conditon => true / false
// null, undefined, 0, false => mặc định return false
if (5 < 3){
    console.log("đã vào")
}
let choice=1;
switch (choice){
    default :
        console.log("đã vào default");
    case "1" : // 1==="1"
        console.log("Xin chào 1");
        break;
    case 2 :
        console.log("Xin chào 2")
}
console.log("đã ra ngoài")

//Loop
let personName="Nhân";
let personAge = 20;
let personAddress = "HCM";
let numberPhone = "0321122323";

//for (vùng khai báo;vùng điều kiện;bước nhảy)
for (let i=5;i<=6;i++){
    console.log("đã vào");
}

//Tính tổng các số chẵn từ 1 đến 200
let sumEven=0;
for (let i=2;i<=200;i+=2){
    sumEven+=i;
}
console.log(sumEven);

// In ra bảng cửu chương từ 2 đến 9
for (let i = 2; i <= 9; i++) {
    let row="Bảng " + i +": ";
    for (let j = 1; j <= 10; j++) {
        let sum = i * j;
        row+=i + "x" + j + "=" + sum+"\t";
        console.log(`${i} x ${j} = ${sum}`);
    }
    console.log(row);
}

//Toán tử 3 ngồi
let test=100;
let a=5;
test = a>5 ?  test+=a : test-=a;

//while (Condition)
//Nhập vào 2 cạnh của HCN
//Tính tổng HCN (Validate 2 cạnh, dài > rộng)
let r, d;
//Bắt nhập lại => dùng cờ hoặc cho vào vòng lặp while
let isValid=false;
while (true) {
    r = Number(input("Nhập chiều rộng: "));
    d = Number(input("Nhập chiều dài: "));

    if (r <= 0 || d <= 0 || r >= d) {
        console.log("Dữ liệu không hợp lệ! (Phải > 0 và Chiều dài > Chiều rộng). Xin hãy nhập lại.\n");
    } else {
        // Nếu mọi thứ đều đúng, thoát khỏi vòng lặp while
        break;
    }
}
/*
let isValid = false; // Cờ báo: Chưa hợp lệ
while (!isValid) { // Chạy chừng nào CHƯA hợp lệ (tức là !false = true)
    r = Number(input("Nhập chiều rộng: "));
    d = Number(input("Nhập chiều dài: "));

    if (r > 0 && d > 0 && d > r) {
        isValid = true; // Nhập đúng thì dựng cờ "Hợp lệ" lên, vòng lặp sẽ dừng
    } else {
        console.log("Nhập sai rồi, nhập lại đi bạn!\n");
    }
}
*/
console.log("Chu vi HCN là: " + (r + d) * 2);
// Ra khỏi vòng lặp tức là dữ liệu đã chuẩn
console.log("Chu vi HCN là: " + (r + d) * 2);
console.log("Diện tích HCN là: " + (r * d));

//do-while : dùng cho menu => người dùng có cơ hội thay đổi lựa chọn của mk
let choice = 0;
do{
    console.log("1/ Đăng nhập");
    console.log("2/ Đăng ký");
    console.log("0/ Thoát");
    choice+=prompt("Lựa chọn của bạn");
    switch (choice){
        case 1:
            alert("Đăng nhập");
            break;
        case 2:
            alert("Đăng ký");
            break;
        case 0:
            alert("Đăng nhập");
            break;
            default:
                alert("Lựa chọn của bạn")
    }
}while(choice!=0);
