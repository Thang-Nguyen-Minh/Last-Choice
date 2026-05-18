let w = prompt("Nhập chiều rộng");
let h = prompt("Nhập chiều cao");

for (let i=0;i<h;i++){
    let rowContent="";
    for (let j=0;j<w;j++){
        rowContent+="*";
    }
    console.log(rowContent);
}