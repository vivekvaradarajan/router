import { Prompt } from "./Prompt";

export class Section{
    Title:string;
    Description:string;
    SubTitle:string;
    Order:number;
    Prompts:Prompt[];
    constructor(Title:string, Description:string,SubTitle:string,Order:number,Prompts:Prompt[]){
        this.Title = Title;
        this.Description = Description;
        this.SubTitle = SubTitle;
        this.Order = Order;
        this.Prompts = Prompts;
    }
  }