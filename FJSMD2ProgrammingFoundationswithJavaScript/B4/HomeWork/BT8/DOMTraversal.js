const deleteButton = document.querySelectorAll('.delete-btn');

deleteButton.forEach(button => {
    button.addEventListener('click', (e) => {
        // e.target trỏ thẳng vào chính cái nút cụ thể vừa bị click
        const parentLi = e.target.parentElement; // Đi ngược lên 1 cấp để tìm thẻ <li> bao quanh nút đó
        parentLi.remove();
    })
})