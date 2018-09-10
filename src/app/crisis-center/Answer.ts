import {Control} from './Control';
export class Answer
{
    QuestionId: number;
    Controls:Control[];
    constructor(QuestionId: number,
        Controls:Control[]){
            this.QuestionId = QuestionId;
            this.Controls = Controls;
        }
}