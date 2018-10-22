import { Component, OnInit, HostBinding ,Input,Output} from '@angular/core';
import { ActivatedRoute, Router,NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized  } from '@angular/router';
import { Observable } from 'rxjs';

import { slideInDownAnimation }   from '../animations';
import { Survey, Section}         from './survey.service';
import { DialogService }  from '../dialog.service';

import {surveyService} from './survey.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { SurveyAnswer } from './SurveyAnswer';
import { SectionAnswer } from './SectionAnswer';
import { Location } from '@angular/common';
import { Patient } from './patient';
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
  patient:Patient;

   

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
    this.route.data
      .subscribe((data: { survey: Survey }) => {
        this.editName = data.survey.SurveyName;
        this.survey = data.survey;
        this.title = data.survey.SurveyTitle;
       
      });

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
        Patient:new Patient(0,"","","","",""),
        InterviewDate:new Date(),
        Interviewee:""
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
     this.surveyService.saveAnswer(this.surveyAnswer);
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
