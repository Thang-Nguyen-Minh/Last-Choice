let salary=prompt("Nhập tiền lương");
let age = prompt("Nhập tuổi");
let credit=false;

if (salary > 15000000 && (age >= 18 && age <= 60) && !credit ) {
    alert("Có thể cho vay")
}
else {
    alert("Không thể cho vay");
}