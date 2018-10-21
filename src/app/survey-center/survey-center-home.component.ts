

import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap,Router,NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

import { Survey, surveyService } from './survey.service';
import { Observable }            from 'rxjs';
import { switchMap }             from 'rxjs/operators';
import {SurveyAnswer} from './SurveyAnswer';




@Component({
  templateUrl:'./survey-center-home.component.html',
})


export class surveyCenterHomeComponent implements OnInit {
  answers: SurveyAnswer[];
  surveys:Survey[];
  survey:Survey;

  selectedId: number;

  constructor(
    private service: surveyService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        this.answers=[];
      }
    });
  }

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

