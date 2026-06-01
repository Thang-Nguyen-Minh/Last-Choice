enum OrderStatus {
    Pending="PENDING",
    Shipped = "SHIPPED",
    Delivered = "DELIVERED"
}
class Order {
    public orderId: number;
    public status: OrderStatus;
    constructor(orderId: number, status: OrderStatus) {
        this.orderId = orderId;
        this.status = status;
    }
    public checkStatus():void{
        if(this.status == OrderStatus.Delivered){
            console.log(`Order #${this.orderId}: Order finished`);
        }
        else{
            console.log(`Order #${this.orderId} is current state: ${this.status}`);
        }
    }
}
const order1=new Order(101,OrderStatus.Delivered);
order1.checkStatus();
const order2=new Order(201,OrderStatus.Pending);
order2.checkStatus();