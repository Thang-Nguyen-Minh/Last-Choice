/*
1. Phương thức indexOf()
Mục đích: Tìm kiếm vị trí đầu tiên của một phần tử trong mảng.
Cơ chế hoạt động: Quét từ đầu đến cuối mảng và so sánh bằng nghiêm ngặt (===).
Giá trị trả về: * Trả về chỉ số (index) của phần tử nếu tìm thấy (từ 0 đến length - 1).
Trả về -1 nếu không tìm thấy.
Cú pháp:
let index = array.indexOf(searchValue);

2. Phương thức includes()
Mục đích: Chỉ kiểm tra xem phần tử có tồn tại trong mảng hay không mà không quan tâm đến vị trí.
Giá trị trả về: Kiểu Boolean (true nếu tìm thấy, false nếu không tìm thấy).
Cú pháp:

let isExist = array.includes(searchValue);
Tư duy xử lý bài toán: Khi đề bài yêu cầu "Nếu có trong mảng, in ra vị trí (index), nếu không in ra Not found", sử dụng trực tiếp indexOf() và kiểm tra kết quả xem có khác -1 hay không là hướng đi tối ưu nhất.
 */
let numbers = [1,2,3,4,5];
const checkNumber = (searchValue) => {
    if (numbers.includes(searchValue)) {
        console.log(numbers.includes(searchValue));
        //return numbers.indexOf(searchValue);
    }
    else{
        console.log("Not Found");
        //return "Not Found";
    }
}
checkNumber(1);
//console.log(checkNumber(3));
