abstract class PaymentMethod{
    abstract processPayment(amount:number):void;
}
class CreditCardPayment extends PaymentMethod{
    private cardNumber:string;
    constructor(cardNumber:string){
        super();
        this.cardNumber = cardNumber;
    }
    // Bắt buộc phải triển khai phương thức trừu tượng
    public processPayment(amount:number):void {
        console.log(`Processing credit card payment of $${amount} using card ${this.cardNumber}`);
    }
}
class PaypalPayment extends PaymentMethod{
    private email:string;
    constructor(email:string) {
        super();
        this.email = email;
    }
    public processPayment(amount:number):void {
        console.log(`Processing PayPal payment of $${amount} via email ${this.email}`);
    }
}
const payment1: PaymentMethod = new CreditCardPayment("4111-XXXX-XXXX-1111");
payment1.processPayment(150);
const payment2: PaymentMethod = new PaypalPayment("nmthang@gmail.com");
payment2.processPayment(134);