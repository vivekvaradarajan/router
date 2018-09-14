import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Survey, surveyService } from './survey.service';
import { Observable }            from 'rxjs';
import { switchMap }             from 'rxjs/operators';

@Component({
  template: `
    <nav class="sub-menu" >
      <a *ngFor="let survey of surveys$ | async" [routerLink]="[survey.Id]" [class.selected]="survey.Id === selectedId" routerLinkActive="active">{{survey.SurveyName}}</a>
    </nav>

    <router-outlet></router-outlet>
  `
})
export class surveyListComponent implements OnInit {
  surveys$: Observable<Survey[]>;
  selectedId: number;

  constructor(
    private service: surveyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.surveys$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        return this.service.getCrises();
      })
    );
  }
}
