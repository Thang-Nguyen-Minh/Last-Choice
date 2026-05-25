/*
Phương thức filter()
Mục đích: Sàng lọc các phần tử trong mảng theo một điều kiện nhất định.
Cơ chế hoạt động: Duyệt qua từng phần tử.
Callback function của filter() bắt buộc phải trả về một giá trị mang tính đúng/sai
(đánh giá theo kiểu Boolean: true hoặc false).
Nếu trả về true: Phần tử đó được giữ lại và đưa vào mảng mới.
Nếu trả về false: Phần tử đó bị loại bỏ.
Đặc điểm: Trả về một mảng mới chứa các phần tử thỏa mãn điều kiện.
Nếu không có phần tử nào thỏa mãn, trả về một mảng rỗng []. Mảng gốc không thay đổi.
Cú pháp:
let filteredArray = array.filter(function(element) {
    return element >= 18; // Điều kiện lọc
});
 */
ages = [15, 20, 12, 18, 25, 30, 10];
let getAdults = ages.filter((age) => {
    return age >= 18;
})
console.log(getAdults);