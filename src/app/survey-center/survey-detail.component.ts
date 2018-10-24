import { Component, OnInit, HostBinding ,Input,Output} from '@angular/core';
import { ActivatedRoute, Router,NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized  } from '@angular/router';
import { Observable } from 'rxjs';

import { ParamMap } from '@angular/router';

import { slideInDownAnimation }   from '../animations';
import {Survey} from './survey';
import {Section} from './Section';
import { DialogService }  from '../dialog.service';

import {surveyService} from './survey.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { SurveyAnswer } from './SurveyAnswer';
import { SectionAnswer } from './SectionAnswer';
import { Location } from '@angular/common';
import { Patient } from './patient';
import {User} from './User';
import { switchMap, ignoreElements }             from 'rxjs/operators';
@Component({
  templateUrl:'./survey-detail.component.html',
  styles: ['input {width: 20em}'],
  animations: [ slideInDownAnimation ]
})
export class surveyDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';

  survey: Survey;
  editName: string;
  title:string;
  surveyAnswer:SurveyAnswer;
  sub;
  user:User; 
  surveyName;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,
    private surveyService: surveyService,
    private formBuilder:FormBuilder,
    private location:Location
  ) {
    router.events.forEach((event) => {

    });
  }
  
  ngOnInit() {
      this.createSurveyAnswer();
  }
  createSurveyAnswer(){
    this.surveyAnswer = null;
    this.user = new User(0,'','',0,0);

   this.sub = this.route.queryParams
      .subscribe(params => {
        this.user.RelatedTo = +params['patientId'] || 0;
        console.log("inside survey detail,patient Id is:",this.user.RelatedTo);
      });


    this.route.data
      .subscribe((data: { survey: Survey }) => {
        this.editName = data.survey.SurveyName;
        this.survey = data.survey;
        this.title = data.survey.SurveyTitle;
        console.log(this.survey);
       
      });

      if(this.editName == 'RISC Patient Interview'){
        this.user.RoleId=60001;
      }

      if(this.editName == 'RISC Parent/Guardian Interview'){
        this.user.RoleId = 60002;
      }

      if(this.editName == 'RISC Provider Interview'){
        this.user.RoleId = 60003;
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
      
      this.surveyAnswer =  {
        SurveyId:this.survey.Id,
        SectionAnswers:sectionAnswers,
        User:this.user ,
        InterviewDate:new Date()
      }; 
  }
  cancel() {
    this.gotoCrises();
  }

  save() {
    this.survey.SurveyName = this.editName;
    this.gotoCrises();
  }

  saveAnswer(): void {
     console.log(JSON.stringify(this.surveyAnswer));
     this.surveyService.saveAnswer(this.surveyAnswer).subscribe(result => console.log(result));
     
  }
  goBack(): void {
    console.log("go back");
  }
  

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no survey or the survey is unchanged
    if (!this.survey || this.survey.SurveyName === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  gotoCrises() {
    let surveyId = this.survey ? this.survey.Id : null;
    // Pass along the survey id if available
    // so that the surveyListComponent can select that survey.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: surveyId, foo: 'foo' }], { relativeTo: this.route });
  }
}
