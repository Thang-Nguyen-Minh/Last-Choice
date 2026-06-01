// 1. Generic Function
function identity<T>(arg: T): T {
    return arg;
}
// 2. Generic Interface
interface Box<T>{
    content: T;
}
// Trường hợp 1: Sử dụng kiểu 'string'
let stringOutput=identity<string>('Hello World');
let stringBox: Box<string>={content:'Hello World 2'};
console.log(`Identity: ${stringOutput}, Box Content: ${stringBox.content}`);
// Trường hợp 2: Sử dụng kiểu 'number'
let numberOutput = identity(2026);
let numberBox: Box<number>={content:2105};
console.log(`Identity: ${numberOutput}, Box Content: ${numberBox.content}`);