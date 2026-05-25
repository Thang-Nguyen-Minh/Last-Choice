/*
1. Phương thức forEach()
Bản chất: Là một vòng lặp thay thế cho for truyền thống. Nó thực thi một hàm lên từng phần tử của mảng.
Đặc điểm: Không trả về giá trị (trả về undefined) và không làm thay đổi mảng gốc.
Nó chỉ dùng khi bạn muốn thực hiện một hành động "tác động phụ" (side-effect) như: in log ra console, lưu vào DB, cập nhật DOM...
Cú pháp:
array.forEach(function(element) {
    // Thực hiện hành động với element
});

2. Phương thức map()
Bản chất: Dùng để biến đổi một mảng thành một mảng mới.
Đặc điểm: Tạo và trả về một mảng mới có cùng độ dài với mảng ban đầu.
Giá trị của từng phần tử trong mảng mới chính là giá trị được return từ inside Callback Function.
Mảng gốc hoàn toàn giữ nguyên.
Cú pháp:
let newArray = array.map(function(element) {
    return element * 2; // Bắt buộc phải có return giá trị mới
});
 */
//Sử dụng forEach() để in ra bình phương của từng phần tử.
let scores = [1, 2, 3, 4, 5];
//let bp=[];
//Duyệt và thực hiện một hành động trực tiếp (side-effect)
// cụ thể ở đây là in log ngay lập tức tại từng vòng lặp.
scores.forEach(score => {
    console.log(score*score);
    //bp.push(score*score);
})
//Map
let doubledScores=scores.map(score => score*2);
//console.log(bp);
console.log(doubledScores);