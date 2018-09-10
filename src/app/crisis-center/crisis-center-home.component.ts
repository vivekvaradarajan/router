

import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Survey, CrisisService } from './crisis.service';
import { Observable }            from 'rxjs';
import { switchMap }             from 'rxjs/operators';
import {SurveyAnswer} from './SurveyAnswer';




@Component({
  template: `
    <p>Welcome to the Crisis Center</p>
    <ul>
    <li *ngFor="let answer of answers$ | async">
    {{answer.SurveyId}}
      <div *ngFor="let sectionAnswer of answer.SectionAnswers">
        <p>{{sectionAnswer.SectionTitle}}</p>
      </div>
    </li>
    </ul>
  `
})


export class CrisisCenterHomeComponent implements OnInit {
  answers$: Observable<SurveyAnswer[]>;
  surveys$:Observable<Survey[]>;

  selectedId: number;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.answers$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        var test = this.service.getAnswers();
        console.log(test);
        return test;
      })
    );
    this.surveys$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        var test = this.service.getCrises();
        console.log(test);
        return test;
      })
    );
  }
}

