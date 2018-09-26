import { BehaviorSubject } from 'rxjs';
import {SurveyAnswer} from './SurveyAnswer';
import {SectionAnswer} from './SectionAnswer';
import {Answer} from './Answer';
import{Control} from './Control';

import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export class Response{
  constructor(public Label:string, public Type:string,public Id:number,public UserName:string){}
}
export class Prompt{
  constructor(public PromptText:string, public ResponseSet:Response[],public Id:number,public UserName:string){}
}
export class Section{
  constructor(public Title:string,public Description:string,public SubTitle:string,public Order:number,public Prompts:Prompt[]){}
}
export class Survey {
  constructor( public SurveyName: string, public SurveyTitle :string, public Sections:Section[],public Id: number,public UserName:string) { }
}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};




const Answers =[
  // new SurveyAnswer(6662,
  //   [new SectionAnswer("fsdfsdf",[new Answer(435,[new Control(324,"fsdfs")])])]
  // )
  ];

import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class surveyService {
  private surveyUrl = 'api/surveys';  // URL to web api
  
  constructor(
    private http: HttpClient, private router: Router) { }
  static nextsurveyId = 100;
  // private crises$: BehaviorSubject<survey[]> = new BehaviorSubject<survey[]>(CRISES);
  surveysObservable: BehaviorSubject<Survey[]>;
  private answers$:BehaviorSubject<SurveyAnswer[]> = new BehaviorSubject<SurveyAnswer[]>(Answers);


  getCrises (): Observable<Survey[]> {
    return this.http.get<Survey[]>("http://localhost:3000/surveys")
  }


  // getCrises() {
  //   return this.http.post<Survey[]>("http://localhost:3000/surveys", httpOptions)
  //   .pipe(
  //     catchError(this.handleError('post survey', "survey"))
  //   );

    // this.surveysObservable = this.http
    // .get<Survey[]>("http://localhost:3000/surveys").pipe;
    //}

  getAnswers() {
    console.log(this.answers$);
    return this.answers$;
  }

  getsurvey(id: number | string) {
    return this.getCrises().pipe(
      map(crises => crises.find(survey => survey.Id === +id))
    );
  }

  saveAnswer (surveyAnswer:SurveyAnswer){
    console.log(surveyAnswer);
    Answers.push(surveyAnswer);

    this.router.navigateByUrl('survey-center/haa/'+surveyAnswer.SurveyId); 

    // return this.http.put(this.surveyUrl, surveyAnswer, httpOptions).pipe(
    //   tap(_ => this.log(`updated SurveyAnswer id=${surveyAnswer.SurveyId}`)),
    //   catchError(this.handleError<any>('updatequestionnaire'))
    // );
  }
  // addsurvey(name: string) {
  //   name = name.trim();
  //   if (name) {
  //     let survey = new survey(surveyService.nextsurveyId++, name);
  //     CRISES.push(survey);
  //     this.crises$.next(CRISES);
  //   }
  // }
  private log(message: string) {
    console.log('${message}');
   // this.messageService.add(`questionnaireService: ${message}`);
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
}


