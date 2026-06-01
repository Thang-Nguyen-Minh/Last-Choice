// F1 -> F12 : Function
// Function -> Tạo hàm (Func)

// Tạo

// Loại 1 : Cơ bản
function ten_fn(){
//     func scope - viết các logic code ở đây
    //return - trả về
    //return có thể có hoặc không, không có mặc định là undefined
    //Ví dụ
    function sayHi(){
        console.log("Xin chào")
    }
    function getNowTime(){
        return Date.now()
    }
}
//Sử dụng
//Func chỉ chạy khi được gọi - cú pháp họi ten_fn()
// console.log(ten_fn());
// console.log(getNowTime());

//Loại 2 : Có đối số
function ten_fn2(a,b){//ab là param dùng để hứng giá tr do người dùng truyền vào
    return a+b;
}
function sum(a,b){
    //fun chuyển dụng trả về giá trị cộng 2 số bất kỳ
    return a+b;
}

console.log(sum(5,7));

//viết 1 function thực hiện kiểm tra 1 số c ó phải là số nguyên tố hay không
//Yêu cầu số nhập vào là số
//Hàm có tính độc lập tái sử dug
//Check số nguyên tố => log ra có là số nguyên tố hay không
// 1. Hàm nhập số: Đảm bảo độc lập, ép người dùng nhập đúng số
function inputNumber(stt = "") {
    let num;
    let nhapSai = false;
    do {
        if (nhapSai) {
            alert("Phải là số nhé!");
        }
        nhapSai = true;
        // Sử dụng stt hợp lý hơn khi nối chuỗi
        num = prompt("Nhập số " + (stt ? stt : ""));

        // Nếu người dùng bấm "Cancel", thoát hàm và trả về null
        if (num === null) return null;

    } while (num.trim() === "" || isNaN(Number(num)));
    // .trim() và Number() giúp chặn trường hợp người dùng chỉ bấm dấu cách (Space)

    return Number(num);
}

// 2. Hàm kiểm tra số nguyên tố: Độc lập, tái sử dụng cao, thực hiện log kết quả
const checkSoNguyenTo = (x) => {
    // Yêu cầu: Số nhập vào phải là số (kiểm tra phòng thủ để tăng tính tái sử dụng)
    if (typeof x !== 'number' || isNaN(x)) {
        console.log(`${x} không phải là một số hợp lệ.`);
        return;
    }

    // Thuật toán kiểm tra số nguyên tố (Giữ nguyên logic tối ưu của bạn)
    let isPrime = true;
    if (x < 2 || !Number.isInteger(x)) {
        isPrime = false; // Số < 2 hoặc số thập phân không phải số nguyên tố
    } else {
        for (let i = 2; i <= Math.sqrt(x); i++) {
            if (x % i === 0) {
                isPrime = false;
                break; // Dừng vòng lặp ngay khi tìm thấy ước số để tối ưu
            }
        }
    }

    // Thực hiện log kết quả ra màn hình theo yêu cầu đề bài
    if (isPrime) {
        console.log(`${x} LÀ số nguyên tố.`);
    } else {
        console.log(`${x} KHÔNG PHẢI là số nguyên tố.`);
    }

    // Vẫn return về true/false để các hàm khác nếu tái sử dụng có thể dùng logic này
    return isPrime;
}

// 3. Sử dụng kết hợp các hàm
const soNguoiDungNhap = inputNumber("cần kiểm tra");

if (soNguoiDungNhap !== null) {
    checkSoNguyenTo(soNguoiDungNhap);
} else {
    console.log("Người dùng đã hủy nhập.");
}