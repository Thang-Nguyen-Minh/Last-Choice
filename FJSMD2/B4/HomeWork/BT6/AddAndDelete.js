const itemList = document.getElementById('item-list');
const addBtn = document.getElementById('add-btn');
const removeBtn = document.getElementById('remove-btn');

//Xử lý logic Thêm phần tử
addBtn.addEventListener('click', (e) => {
    const newItem = document.createElement('li');//Khởi tạo thẻ <li> trong bộ nhớ
    newItem.textContent = "New Item"; //Đổ nội dung vào thẻ
    itemList.appendChild(newItem);// Đẩy vào vị trí cuối cùng của thẻ ul
});
// Xử lý logic Xóa phần tử cuối
removeBtn.addEventListener('click', (e) => {
    const lastItem = itemList.lastElementChild;
    if (lastItem) {
        lastItem.remove();//Chỉ xóa nếu không rỗng
    }
})