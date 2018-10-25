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
import {NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ModalAboutComponent } from '../modal-about/modal-about.component';

@Component({
  templateUrl:'./survey-detail.component.html',
  styles: ['input {width: 20em}'],
  animations: [ slideInDownAnimation ]
})
export class surveyDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  originalSurveyString:string;
  survey: Survey;
  editName: string;
  title:string;
  surveyAnswer:SurveyAnswer;
  sub;
  user:User; 
  surveyName;
  hasSaved:boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,
    private surveyService: surveyService,
    private formBuilder:FormBuilder,
    private location:Location,
    private modalService: NgbModal
  ) {
    router.events.forEach((event) => {

    });
  }
  
  ngOnInit() {
    this.route.data
       .subscribe((data: { survey: Survey }) => {        
         this.survey = data.survey;
         this.originalSurveyString = JSON.stringify(this.survey);
         this.hasSaved = false;
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
     this.hasSaved = true;
  }
  goBack(): void {
    console.log("go back");
  }
  

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no survey or the survey is unchanged
    if (!this.survey || JSON.stringify(this.survey)==this.originalSurveyString || this.hasSaved) {
      console.log("nothing changed");
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('You will be navigated away to another page. Are you sure you want to discard all your unsaved changes?');
  }

  gotoCrises() {
    let surveyId = this.survey ? this.survey.Id : null;
    // Pass along the survey id if available
    // so that the surveyListComponent can select that survey.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: surveyId, foo: 'foo' }], { relativeTo: this.route });
  }

  open() {
    const modalRef = this.modalService.open(ModalAboutComponent);
    this.surveyService.saveTempAnswer(this.survey.SurveyAnswer);
   // modalRef.componentInstance.title = 'this is the tilte';
   // console.log("before saving",this.surveyAnswer);
   // modalRef.componentInstance.surveyAnswer = this.survey.SurveyAnswer;
  }
}
