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
    this.route.data
       .subscribe((data: { survey: Survey }) => {        
         this.survey = data.survey;
       console.log("inside detail component",this.survey);
    
    });
    
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
