const registerForm = document.getElementById('register-form');
//Lắng nghe sự kiện "Submit" của Form thay vì click của Button
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //Lấy ra value
    const usernameValue=document.getElementById('username').value;
    const emailValue=document.getElementById('email').value;
    // Đóng gói dữ liệu thành Object đúng cấu trúc
    const formData = {
        username: usernameValue,
        email: emailValue
    };

    // In kết quả ra ô Console của F12 DevTools
    console.log('Dữ liệu Form thu thập được:', formData);
})