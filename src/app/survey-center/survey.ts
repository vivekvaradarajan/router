import { Section } from "./Section";
import {SurveyAnswer} from './SurveyAnswer';

export class Survey{
    Id:number;
    SurveyName:string;
    SurveyTitle:string;
    Sections:Section[];
    UserName:string;
    SurveyAnswer:SurveyAnswer;
    constructor( SurveyName: string, SurveyTitle :string, Sections:Section[],Id: number,UserName:string, SurveyAnswer:SurveyAnswer) { 
        this.Id = Id;
        this.SurveyName = SurveyName;
        this.SurveyTitle = SurveyTitle;
        this.Sections = Sections;
        this.UserName = UserName;
        this.SurveyAnswer = SurveyAnswer;

    }
  
}
