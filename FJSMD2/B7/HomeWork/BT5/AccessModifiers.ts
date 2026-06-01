class Employee {
    public name : string;
    private salary : number;

    constructor(name : string, salary : number) {
        this.name = name;
        this.salary = salary;
    }
    public getEmployeeInfo(): string {
        // Hợp lệ: Truy cập 'salary' bên trong lớp
        return `Employee: ${this.name}, Salary: ${this.salary}`;
    }
}
// Thử nghiệm
const emp=new Employee("Minh Thang",5000);
console.log(emp.getEmployeeInfo());
//console.log(emp.salary);