export class Response{
    Label:string;
    Type:string;
    Id:number;
    UserName:string;

    constructor(Label:string, Type:string,Id:number,UserName:string){
        this.Label = Label;
        this.Type = Type;
        this.Id = Id;
        this.UserName = UserName;
    }
  }