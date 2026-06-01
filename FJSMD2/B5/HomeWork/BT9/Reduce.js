/*
Phương thức reduce()
reduce() dùng để thực thi một hàm tích lũy lên từng phần tử
kết quả cuối cùng thu về là một giá trị duy nhất (có thể là một số, một chuỗi, một object, hoặc một mảng gộp).

let finalResult = array.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, initialValue);

Giải thích các thành phần:
accumulator (Biến tích lũy): Lưu trữ giá trị gộp của các bước trước đó truyền lại.
currentValue (Phần tử hiện tại): Phần tử đang được duyệt tới trong mảng.
initialValue (Giá trị khởi tạo): Giá trị ban đầu cấp cho accumulator ở lượt chạy đầu tiên.
Khuyến nghị luôn truyền initialValue (ví dụ: số 0 cho bài toán tính tổng)
để tránh các lỗi logic không đáng có khi mảng rỗng.

Luồng chạy logic:
Ở vòng lặp đầu tiên, accumulator = initialValue.
Sau mỗi vòng, giá trị return của callback sẽ được gán lại cho accumulator để dùng cho vòng tiếp theo.
 */
let prices = [100, 200, 300, 400];
let totalPrice=prices.reduce((acc, cur) => {
    return acc + cur;
},0)
//Run
//0+100=100 gán lại acc=100
//100+200=300 gán lại acc=300
//300+300=600 gán lại acc=600
//600+400=1000 end vòng lặp
console.log(totalPrice*1.1);