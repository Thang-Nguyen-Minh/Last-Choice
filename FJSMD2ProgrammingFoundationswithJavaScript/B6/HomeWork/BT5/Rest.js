function sumAllNumbers(...numbers){
    let kq=0;
    for (let x of numbers){
        kq+=x;
    }
    return kq;
}

console.log(sumAllNumbers(1,2,3,4))
console.log(sumAllNumbers(2,3,4,5))