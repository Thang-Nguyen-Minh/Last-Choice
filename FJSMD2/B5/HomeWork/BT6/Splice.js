/*
[Bài 6] Thao tác mảng với Splice
Phương thức splice()
splice() là một phương thức cực kỳ mạnh mẽ vì nó có thể thay đổi trực tiếp mảng ban đầu (mutates the array)
bằng cách xóa, thay thế hoặc thêm mới phần tử tại một vị trí bất kỳ.
Cú pháp:
array.splice(start, deleteCount, item1, item2, ...);
Giải thích tham số:
start: Vị trí (index) bắt đầu thực hiện thao tác.
deleteCount: Số lượng phần tử muốn xóa tính từ vị trí start. Nếu bằng 0, không có phần tử nào bị xóa.
item1, item2, ...: Các phần tử mới muốn chèn vào ngay tại vị trí start (tùy chọn).
Luồng xử lý (Xóa và Chèn đồng thời):
Khi deleteCount > 0 và có các tham số item phía sau, splice() sẽ nhấc các phần tử cũ ra trước
sau đó chèn các phần tử mới vào đúng khoảng trống vừa tạo, đẩy các phần tử phía sau lùi lại.
 */
let colors = ["Red", "Green", "Blue"];
colors.splice(1,1,"Yellow","Pink");
console.log(colors);