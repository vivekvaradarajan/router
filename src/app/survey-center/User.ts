export class User
{
    Id:number;
    FirstName:string;
    LastName:string;
    RoleId:number;
    RelatedTo:number; 
  
    constructor(Id:number,FirstName:string,LastName:string,RoleId:number,RelatedTo:number){
            this.Id = Id;
            this.FirstName = FirstName;
            this.LastName = LastName;
            this.RoleId = RoleId;
            this.RelatedTo = RelatedTo;
        }
}