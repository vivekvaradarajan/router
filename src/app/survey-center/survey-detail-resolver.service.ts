import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';

import { surveyService }  from './survey.service';
import {Survey} from './survey';
import { User } from './User';

@Injectable()
export class surveyDetailResolver implements Resolve<Survey> {
  constructor(private cs: surveyService, private router: Router) {}
  survey:Survey;
  patientId:number;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Survey> {
    let id = route.paramMap.get('id');
    this.patientId = parseInt(route.paramMap.get('patientId'));

    return this.cs.getsurvey(id).pipe(
      take(1),
      map(survey => {
        if (survey) {
          console.log("Inside resolving",survey);
          this.survey = survey;
          this.createSurveyAnswer();
          return survey;
        } else { // id not found
          this.router.navigate(['/survey-center']);
          return null;
        }
      })
    );
  }

  createSurveyAnswer(){
    let user = new User(0,'','',0,this.patientId);

    if(this.survey.SurveyName == 'RISC Patient Interview'){
        user.RoleId=60001;
      }
    
    if(this.survey.SurveyName == 'RISC Parent/Guardian Interview'){
        user.RoleId = 60002;
    }

    if(this.survey.SurveyName == 'RISC Provider Interview'){
        user.RoleId = 60003;
    }

    let sectionAnswers=[];

    for (let i = 0; i < this.survey.Sections.length; i++) {
      let answers= [];
      console.log(this.survey.Sections[i].Prompts.length);
      for(let j=0;j<this.survey.Sections[i].Prompts.length;j++){
        let controls=[];
        for(let k=0;k<this.survey.Sections[i].Prompts[j].ResponseSet.length;k++){
          let control = {ControlId:this.survey.Sections[i].Prompts[j].ResponseSet[k].Id};
          controls.push(control);
        }

        let answer = {QuestionId:this.survey.Sections[i].Prompts[j].Id,Controls:controls};
        answers.push(answer);          
      }
      let sectionAnswer={SectionTitle:this.survey.Sections[i].SubTitle,Answers:answers};

      sectionAnswers.push(sectionAnswer);
    }
    
    this.survey.SurveyAnswer =  {
      SurveyId:this.survey.Id,
      SectionAnswers:sectionAnswers,
      User: user ,
      InterviewDate:new Date()
    }; 
    
    console.log("inside survey answer resolver",this.survey.SurveyAnswer);
  }

}
