import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';

import { surveyService }  from './survey.service';
import {Survey} from './survey';

@Injectable()
export class surveyDetailResolver implements Resolve<Survey> {
  constructor(private cs: surveyService, private router: Router) {}
  survey:Survey;
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Survey> {
    let id = route.paramMap.get('id');

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

  //   this.user = new User(0,'','',0,0);

  //  this.sub = this.route.queryParams
  //     .subscribe(params => {
  //       this.user.RelatedTo = +params['patientId'] || 0;
  //       console.log("inside survey detail,patient Id is:",this.user.RelatedTo);
  //     });


  //   this.route.data
  //     .subscribe((data: { survey: Survey }) => {
  //       this.editName = data.survey.SurveyName;
  //       this.survey = data.survey;
  //       this.title = data.survey.SurveyTitle;
  //       console.log(this.survey);
       
  //     });

  //     if(this.editName == 'RISC Patient Interview'){
  //       this.user.RoleId=60001;
  //     }

  //     if(this.editName == 'RISC Parent/Guardian Interview'){
  //       this.user.RoleId = 60002;
  //     }

  //     if(this.editName == 'RISC Provider Interview'){
  //       this.user.RoleId = 60003;
  //     }

  //     let sectionAnswers=[];

  //     for (let i = 0; i < this.survey.Sections.length; i++) {
  //       let answers= [];
  //       console.log(this.survey.Sections[i].Prompts.length);
  //       for(let j=0;j<this.survey.Sections[i].Prompts.length;j++){
  //         let controls=[];
  //         for(let k=0;k<this.survey.Sections[i].Prompts[j].ResponseSet.length;k++){
  //           let control = {ControlId:this.survey.Sections[i].Prompts[j].ResponseSet[k].Id};
  //          controls.push(control);
  //         }

  //         let answer = {QuestionId:this.survey.Sections[i].Prompts[j].Id,Controls:controls};
  //         answers.push(answer);          
  //       }
  //       let sectionAnswer={SectionTitle:this.survey.Sections[i].SubTitle,Answers:answers};

  //       sectionAnswers.push(sectionAnswer);
  //     }
      
  //     this.surveyAnswer =  {
  //       SurveyId:this.survey.Id,
  //       SectionAnswers:sectionAnswers,
  //       User:this.user ,
  //       InterviewDate:new Date()
  //     }; 
  }

}
