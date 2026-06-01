class Animal{
    public name:string;
    constructor(name:string){
        this.name=name;
    }
    public makeSound():void{
        console.log(`${this.name} is making a sound.`);
    }
}
class Dog extends Animal{
    constructor(name:string) {
        super(name);// Gọi lại constructor của lớp cha Animal
    }
}
// Thử nghiệm
const myDog = new Dog("KiKi");
myDog.makeSound(); // Output: KiKi is making a sound.