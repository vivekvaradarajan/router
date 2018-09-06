import { Component, OnInit, HostBinding ,Input,Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { slideInDownAnimation }   from '../animations';
import { Survey, Section}         from './crisis.service';
import { DialogService }  from '../dialog.service';

import {CrisisService} from './crisis.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { SurveyAnswer } from './SurveyAnswer';
import { SectionAnswer } from './SectionAnswer';
import { Location } from '@angular/common';
@Component({
  templateUrl:'./crisis-detail.component.html',
  styles: ['input {width: 20em}'],
  animations: [ slideInDownAnimation ]
})
export class CrisisDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';

  crisis: Survey;
  editName: string;
  title:string;
  surveyAnswer:SurveyAnswer;
   

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,
    private crisisService: CrisisService,
    private formBuilder:FormBuilder,
    private location:Location
  ) {
  }
  
  ngOnInit() {
    this.route.data
      .subscribe((data: { crisis: Survey }) => {
        this.editName = data.crisis.SurveyName;
        this.crisis = data.crisis;
        this.title = data.crisis.SurveyTitle;
       
      });

      let sectionAnswers=[];

      for (let i = 0; i < this.crisis.Sections.length; i++) {
        let answers= [];
        console.log(this.crisis.Sections[i].Prompts.length);
        for(let j=0;j<this.crisis.Sections[i].Prompts.length;j++){
          let controls=[];
          for(let k=0;k<this.crisis.Sections[i].Prompts[j].ResponseSet.length;k++){
            let control = {ControlId:this.crisis.Sections[i].Prompts[j].ResponseSet[k].Id};
           controls.push(control);
          }

          let answer = {QuestionId:this.crisis.Sections[i].Prompts[j].Id,Controls:controls};
          answers.push(answer);          
        }
        let sectionAnswer={SectionTitle:this.crisis.Sections[i].SubTitle,Answers:answers};

        sectionAnswers.push(sectionAnswer);
      }
      
      this.surveyAnswer =  {
        SurveyId:this.crisis.Id,
        SectionAnswers:sectionAnswers
      };   
  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.SurveyName = this.editName;
    this.gotoCrises();
  }

  saveAnswer(): void {
    console.log(this.surveyAnswer);
    // this.crisisService.saveAnswer(this.surveyAnswer)
    //   .subscribe(() => this.goBack());
  }
  goBack(): void {
    console.log("go back");
  }
  

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.SurveyName === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  gotoCrises() {
    let crisisId = this.crisis ? this.crisis.Id : null;
    // Pass along the crisis id if available
    // so that the CrisisListComponent can select that crisis.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }
}
