import { fetchUsers } from './apiService.js';

async function renderUsers(){
    const userList = document.getElementById('user-list');
    //1. Gọi dữ liệu từ apiService
    const users= await fetchUsers();
    // 2. Dùng map kết hợp với Destructuring và Template String
    const htmlCards=users.map(({name,email,website})=>{
        return `
        <div class="user-card" style="border: 1px solid #ccc; padding: 16px; margin: 10px; border-radius: 8px;">
                <h3>${name}</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Website:</strong> <a href="http://${website}" target="_blank">${website}</a></p>
            </div>`
    })
    // 3. Ghi mảng HTML vừa tạo vào DOM (Dùng join('') để biến mảng thành chuỗi HTML)
    userList.innerHTML=htmlCards.join('');
}
document.addEventListener('DOMContentLoaded',renderUsers);