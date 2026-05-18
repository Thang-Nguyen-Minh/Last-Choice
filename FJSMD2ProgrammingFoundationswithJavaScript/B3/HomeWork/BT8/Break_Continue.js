let totalSum=0;

for (let i = 1; i <= 50; i++) {
    if (i%5==0){
        continue;
    }
    console.log(i);
    totalSum+=i;
    if (totalSum > 200){
        break;
    }
}
console.log(totalSum);