

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
    <li *ngFor="let answer of answers">
    {{answer.SurveyId}}
      <div *ngFor="let sectionAnswer of answer.SectionAnswers">
        <p>{{sectionAnswer.SectionTitle}}</p>
      </div>
    </li>
    </ul>

Survey: {{survey}}
Selected ID: {{selectedId}}
 <ul>
  <li *ngFor="let survey of surveys$ | async">
    {{survey.SurveyName}}
  </li>
 </ul>

  `
})


export class CrisisCenterHomeComponent implements OnInit {
  answers: SurveyAnswer[];
  surveys:Survey[];
  survey:Survey;

  selectedId: number;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
   this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        var test = this.service.getAnswers();
        console.log(test);
        return test;
      })
    ).subscribe(c =>{
      this.answers = c as SurveyAnswer[]
    });

   this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        var test = this.service.getCrises();
        console.log(test);
        return test;
      })
    ).subscribe(c=>{
      this.surveys = c as Survey[]
    });

    this.survey = this.surveys.filter(x => x.Id == this.selectedId)[0];

  }
}

