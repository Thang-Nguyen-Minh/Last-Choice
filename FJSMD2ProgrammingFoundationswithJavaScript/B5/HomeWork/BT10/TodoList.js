/*
[Bài 10] Xây dựng hệ thống Todo List cơ bản
Bài toán này không yêu cầu phương thức nâng cao mà kiểm tra khả năng phối hợp Array Manipulation (Thao tác mảng) và State Management (Quản lý trạng thái dữ liệu thông qua hàm).

1. Cơ chế quản lý trạng thái bằng Mảng
Một mảng toàn cục (global) hoặc mảng nằm trong phạm vi quản lý sẽ đóng vai trò là "Single Source of Truth" (Nguồn dữ liệu gốc).
Mọi hành động (Thêm, Xóa, Xem) đều phải tham chiếu hoặc biến đổi mảng này.
2. Các logic mảng cần dùng:
Thêm phần tử: Dùng array.push(item) để đẩy một phần tử mới vào cuối mảng.
Xóa phần tử theo vị trí: Sử dụng array.splice(index, 1)
để cắt bỏ chính xác 1 phần tử tại vị trí index xác định.
Hiển thị kèm số thứ tự (1-based index):
Khi duyệt mảng bằng forEach, callback function không chỉ nhận vào element mà còn nhận vào
index (chỉ số chạy từ 0). Để hiển thị số thứ tự thân thiện với người dùng,
ta sử dụng công thức: STT = index + 1.
 */
let tasks=['Study Code','Learn English','Read Book','Do Exercise','Get up Soon'];
const addTask=(title)=>{
    tasks.push(title);
}
const removeTask=(index)=>{
    tasks.splice(index,1);
}
const displayTask=()=>{
    tasks.forEach((task,index)=>{
        console.log(`${index+1} - ${task}`);
    })
}
addTask("Ai Agent");
removeTask(2);
displayTask();