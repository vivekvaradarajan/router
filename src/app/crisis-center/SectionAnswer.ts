import {Answer} from './Answer';
export class SectionAnswer
{
    SectionTitle:string; 
    Answers:Answer[];
    constructor(SectionTitle:string,
        Answers:Answer[]){
            this.SectionTitle = SectionTitle;
            this.Answers = Answers;
        }
}