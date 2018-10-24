import { Response } from "./response";
export class Prompt{
    PromptText:string;
    ResponseSet:Response[];
    Id:number;
    UserName:string
    constructor(PromptText:string, ResponseSet:Response[],Id:number,UserName:string){
        this.PromptText = PromptText;
        this.ResponseSet = ResponseSet;
        this.Id = Id;
        this.UserName = UserName;
    }
  }