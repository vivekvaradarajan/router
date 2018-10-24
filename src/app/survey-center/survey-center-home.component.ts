

import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap,Router,NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

import { surveyService } from './survey.service';
import {Survey} from './survey';
import { Observable }            from 'rxjs';
import { switchMap }             from 'rxjs/operators';
import {SurveyAnswer} from './SurveyAnswer';




@Component({
  templateUrl:'./survey-center-home.component.html',
})


export class surveyCenterHomeComponent implements OnInit {
  answers: SurveyAnswer[];
  surveys$: Observable<Survey[]>;
 
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
    console.log("survey center is initiated");
    this.surveys$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        return this.service.getnoSurveys();
      })
    );
    this.surveys$.subscribe(data =>
      this.survey = data.filter(x => x.Id == this.selectedId)[0]
      )
  }
}

