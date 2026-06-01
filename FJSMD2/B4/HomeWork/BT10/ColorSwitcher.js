const colors = ["red", "blue", "green", "yellow", "purple"];
const changeColor = document.getElementById("change-color-btn");
const colorText = document.getElementById("color-text");

changeColor.addEventListener("click", (e) => {
    // 1. Logic tính vị trí ngẫu nhiên:
    // Math.random() trả về từ 0 đến sát 1 (ví dụ: 0.65)
    // Nhân với độ dài mảng (5) -> 3.25
    // Math.floor làm tròn xuống số nguyên gần nhất -> Chỉ số 3 (Tương ứng màu "yellow")
    const randomIndex=Math.floor(Math.random() * colors.length);
    const selectedColor = colors[randomIndex];

    // 2. Can thiệp trực tiếp vào CSS inline của thẻ body để đổi màu nền toàn trang
    document.body.style.backgroundColor = selectedColor;
    // 3. Cập nhật chữ hiển thị mã màu lên màn hình
    colorText.textContent = selectedColor;
})