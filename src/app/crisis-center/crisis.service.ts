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

const surveys =[
 new Survey( "RISC Patient Interview","Titallll", [
   new Section(
     "Patient Threat Review Section I",
     "For use with the patient.",
     "Review of Threat",
     1,
     [new Prompt( 
       "What happened that made others concerned that you wanted to harm someone? Did you say anything or do anything that prompted that worry? What did you say [exact wording] or do? What did you mean by that?" ,
       [new Response(null,"text",50001,null),
       new Response("cue 1","checkbox",50002,null),
       new Response("cue 2","checkbox",50003,null),
       new Response("cue 3","checkbox",50004,null)
      ],
       40001,
       null
      ),
      new Prompt( 
        "What halallallarm someone? Did you say anything or do anything that prompted that worry? What did you say [exact wording] or do? What did you mean by that?" ,
        [new Response(null,"text",60001,null),
        new Response("cue 1","checkbox",60002,null),
        new Response("cue 2","checkbox",60003,null),
        new Response("cue 3","checkbox",60004,null)
       ],
        40002,
        null
       )
    ]
    ),
    new Section(
      "Patient Threat Review Section II",
      "For use with the patient.",
      "Review of Threat",
      1,
      [new Prompt( 
        "What happened that made others concerned that you wanted to harm someone? Did you say anything or do anything that prompted that worry? What did you say [exact wording] or do? What did you mean by that?" ,
        [new Response(null,"text",70001,null),
        new Response("cue 1","checkbox",70002,null),
        new Response("cue 2","checkbox",70003,null),
        new Response("cue 3","checkbox",70004,null)
       ],
        40003,
        null
       ),
       new Prompt( 
         "What halallallarm someone? Did you say anything or do anything that prompted that worry? What did you say [exact wording] or do? What did you mean by that?" ,
         [new Response(null,"text",80001,null),
         new Response("cue 1","checkbox",80002,null),
         new Response("cue 2","checkbox",80003,null),
         new Response("cue 3","checkbox",80004,null)
        ],
         40004,
         null
        )
     ]
     )],10002,null),
 new Survey("RISC Parent/Guardian Interview",null, [
  new Section(
    "Patient Threat Review",
    "For use with the patient.",
    "Review of Threat",
    1,
    [new Prompt( 
      "What hted to harm someone? Did you say anything or do anything that prompted that worry? What did you say [exact wording] or do? What did you mean by that?" ,
      [new Response(null,"text",90001,null)],
      40005,
      null
     )
   ]
   )],20002,null),
 new Survey("RISC Provider Interview", null, [
  new Section(
    "Patient Threat Review",
    "For use with the patient.",
    "Review of Threat",
    1,
    [new Prompt( 
      "What hae others concerned that you wanted to harm someone? Did you say anything or do anything that prompted that worry? What did you say [exact wording] or do? What did you mean by that?" ,
      [new Response(null,"text",40001,null)],
      40006,
      null
     )
   ]
   )],20003,null)
];


const Answers =[
  new SurveyAnswer(10002,
    [new SectionAnswer("fsdfsdf",[new Answer(435,[new Control(324,"fsdfs")])])]
  )
  ];

import { Injectable, Input } from '@angular/core';


@Injectable()
export class CrisisService {
  private surveyUrl = 'api/surveys';  // URL to web api
  
  constructor(
    private http: HttpClient) { }
  static nextCrisisId = 100;
  // private crises$: BehaviorSubject<Crisis[]> = new BehaviorSubject<Crisis[]>(CRISES);
  private surveys$: BehaviorSubject<Survey[]> = new BehaviorSubject<Survey[]>(surveys);

  getCrises() { return this.surveys$; }

  getCrisis(id: number | string) {
    return this.getCrises().pipe(
      map(crises => crises.find(crisis => crisis.Id === +id))
    );
  }

  saveAnswer (surveyAnswer:SurveyAnswer): Observable<any> {
    console.log(surveyAnswer);
    return this.http.put(this.surveyUrl, surveyAnswer, httpOptions).pipe(
      tap(_ => this.log(`updated SurveyAnswer id=${surveyAnswer.SurveyId}`)),
      catchError(this.handleError<any>('updatequestionnaire'))
    );
  }
  // addCrisis(name: string) {
  //   name = name.trim();
  //   if (name) {
  //     let crisis = new Crisis(CrisisService.nextCrisisId++, name);
  //     CRISES.push(crisis);
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


