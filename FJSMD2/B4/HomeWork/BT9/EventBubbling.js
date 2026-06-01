const parentBox = document.getElementById('parent-box');
const childBtn = document.getElementById('child-btn');

parentBox.addEventListener('click', (e) => {
    console.log('LOG: Bạn vừa click vào thẻ CHA (Parent Box)');
})

childBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    console.log('LOG: Bạn vừa click vào nút CON (Child Button)');
})