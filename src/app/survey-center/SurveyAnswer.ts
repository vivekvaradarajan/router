import {SectionAnswer} from './SectionAnswer';
import { Patient } from './patient';

export class SurveyAnswer
{
    SurveyId:number;
    Patient:Patient;
    Interviewee:string;
    InterviewDate:Date;
    SectionAnswers:SectionAnswer[];
    constructor(SurveyId:number,
        Patient:Patient,Interviewee:string,InterviewDate:Date,
        SectionAnswers:SectionAnswer[]){
            this.SurveyId = SurveyId;
            this.SectionAnswers = SectionAnswers;
            this.Patient = Patient;
            this.Interviewee=Interviewee;
            this.InterviewDate = InterviewDate;
        }
}