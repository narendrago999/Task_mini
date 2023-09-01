export class User {
    EMP_ID: string;
    FirstName: string;
    LastName: string;
    Number: number;
    Employee_Email: string;
    Token: string;
  
    constructor(EMP_ID: string,FirstName: string,LastName: string, Number: number, Employee_Email: string, Token: string) {
      this.EMP_ID = EMP_ID;
      this.FirstName = FirstName;
      this.LastName = LastName;
      this.Number = Number;
      this.Employee_Email = Employee_Email;
      this.Token = Token;
    }

   

  }