export class Patient
{
    Id: number;
    FirstName:string;
    LastName:string;
    Gender:string;
    Grade:string;
    constructor( Id: number,FirstName:string,
    LastName:string,Gender:string,Grade:string){
            this.Id = Id;
            this.FirstName= FirstName;
            this.LastName = LastName;
            this.Gender = Gender;
            this.Grade = Grade;
        }
}