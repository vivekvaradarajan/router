import {SectionAnswer} from './SectionAnswer';

export class SurveyAnswer
{
    SurveyId:number;
    SectionAnswers:SectionAnswer[];
    constructor(SurveyId:number,
        SectionAnswers:SectionAnswer[]){
            this.SurveyId = SurveyId;
            this.SectionAnswers = SectionAnswers;
        }
}