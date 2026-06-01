let a=prompt("Nhập số nguyên bất kỳ");
let flag=true;
if (a<2){
    flag=false;
}
else {
    for (let i=2;i<=Math.sqrt(a);i++){
        if (a%i==0){
            flag=false;
            break;
        }
    }
}
if (flag){
    console.log("Là số nguyên tố");
}
else {
    console.log("Không phải số nguyên tố")
}
