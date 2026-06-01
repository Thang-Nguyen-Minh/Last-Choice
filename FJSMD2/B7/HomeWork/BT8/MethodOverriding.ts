class Shape{
    public calculateArea() : number{
        return 0;
    }
}
class Circle extends Shape{
    private radius:number;
    constructor(radius:number){
        super();
        this.radius = radius;
    }
    // Ghi đè (Override)
    public calculateArea():number{
        return Math.PI*this.radius*this.radius;
    }
}
class Rectangle extends Shape{
    private width:number;
    private height:number;
    constructor(width:number,height:number) {
        super();
        this.width = width;
        this.height = height;
    }
    public calculateArea():number{
        return this.width*this.height;
    }
}
// Thử nghiệm tính đa hình
const shapes:Shape[] = [new Circle(5),new Rectangle(4,6)];
shapes.forEach((shape)=>{
    console.log(`Area: ${shape.calculateArea().toFixed(2)}`);
})
