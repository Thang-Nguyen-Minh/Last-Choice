//1. Lấy các phần tử cần tương tác
const userInput = document.getElementById('user-input');
const keyDisplay = document.getElementById('key-display');

//2. Event Handling : Lắng nghe sự kiện gõ phím
userInput.addEventListener('keydown', (e) => {
    //e.key trả ề chuỗi ký tự của phím (Ví dụ : "a", "Enter", "ArrowUp")
    //Gán trực tiếp giá trị này vào text của thẻ span
    //Lấy hết ký tự vừa có
    //keyDisplay.textContent += e.key;
    //keyDisplay.textContent = userInput.value;
    keyDisplay.textContent = e.key;
})