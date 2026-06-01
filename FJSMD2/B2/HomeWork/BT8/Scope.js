// 1. Thử thách Hoisting
console.log("Giá trị message trước khi khai báo:", message);
var message = "Hello";
// Giải thích: Kết quả là undefined vì JS thực hiện "Hoisting" đưa 'var message;' lên đầu, 
// nhưng phép gán giá trị vẫn nằm ở dòng dưới.

// 2. Thử thách Function Scope
function testScope() {
    var localInFunction = "Tôi nằm trong hàm";
    console.log("Bên trong hàm:", localInFunction);
}

testScope();

try {
    console.log("Truy cập từ bên ngoài:", localInFunction);
} catch (error) {
    console.log("Lỗi Scope:", error.message);
    // Kết quả: ReferenceError vì biến var trong hàm có function scope, không thể truy cập từ ngoài.
}