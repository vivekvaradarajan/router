import {SectionAnswer} from './SectionAnswer';
import { Patient } from './patient';

export class SurveyAnswer
{
    SurveyId:number;
    PatientId:number;
    Interviewee:string;
    InterviewDate:Date;
    SectionAnswers:SectionAnswer[];
    constructor(SurveyId:number,
        PatientId:number,Interviewee:string,InterviewDate:Date,
        SectionAnswers:SectionAnswer[]){
            this.SurveyId = SurveyId;
            this.SectionAnswers = SectionAnswers;
            this.PatientId = PatientId;
            this.Interviewee=Interviewee;
            this.InterviewDate = InterviewDate;
        }
}