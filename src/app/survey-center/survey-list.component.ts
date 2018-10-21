import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Survey, surveyService } from './survey.service';
import { Observable }            from 'rxjs';
import { switchMap }             from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  template: `
    <nav class="sub-menu" >
      <a *ngFor="let survey of surveys" [routerLink]="[survey.Id]" [class.selected]="survey.Id === selectedId" routerLinkActive="active">{{survey.SurveyName}}</a>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class surveyListComponent implements OnInit {
  surveys$: Observable<Survey[]>;
  selectedId: number;

  constructor(
    private service: surveyService,
    private route: ActivatedRoute,
    private httpClient:HttpClient
  ) {}

  ngOnInit() {

console.log("on init is not being called")
    this.surveys$ = this.route.paramMap.pipe(
           switchMap((params: ParamMap) => {
             this.selectedId = +params.get('id');
              return this.service.getnoSurveys();
             
           })
         );

      


    // console.log("Survey list page initiation");
    // this.service.getSurveys()
    // .subscribe((data) => {
    //   console.log("get survey list");
      
    //   this.surveys = data;
    // }
    //   );
   
    // this.surveys$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     this.selectedId = +params.get('id');
    //     return this.service.getCrises();
    //   })
    // );
  }
}
