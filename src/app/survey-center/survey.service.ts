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
 new Survey( "RISC Patient Interview","", [
   new Section(
     "Patient Threat Review",
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
        "Usually people have some reasons that made them say or do something like that. What happened that led up to the point where you [made that threat, said what you said, acted like you did]?" ,
        [new Response(null,"text",60001,null),
        new Response("cue 1","checkbox",60002,null),
        new Response("cue 2","checkbox",60003,null),
        new Response("cue 3","checkbox",60004,null)
       ],
        40002,
        null
       ),
       new Prompt( 
        "If you had the chance, or had actually done what you said you were going to do, how would you have done it? Did you have a plan, or an idea, or imagine how you would hurt [threatened person]?" ,
        [new Response(null,"text",60001,null),
        new Response("cue 1","checkbox",60002,null),
        new Response("cue 2","checkbox",60003,null),
        new Response("cue 3","checkbox",60004,null)
       ],
        40003,
        null
       ),
       new Prompt( 
        "Do you still want to hurt [threatened person]? Is there anything that could happen or that anyone might do that would make you feel like carrying out your threat now? If you could do it or did it, how do you think you would feel afterwards?" ,
        [new Response(null,"text",60001,null),
        new Response("cue 1","checkbox",60002,null),
        new Response("cue 2","checkbox",60003,null),
        new Response("cue 3","checkbox",60004,null)
       ],
        40004,
        null
       ),
       new Prompt( 
        "What would happen to you if you did it? What about your family, friends, etc.? What would happen to them (threatened person)? What would happen to their family and friends?" ,
        [new Response(null,"text",60001,null),
        new Response("cue 1","checkbox",60002,null),
        new Response("cue 2","checkbox",60003,null),
        new Response("cue 3","checkbox",60004,null)
       ],
        40005,
        null
       )
    ]
    )
     ],10002,null),
 new Survey("RISC Parent/Guardian Interview",null, [
  new Section(
    "Parent/Guardian Threat Review",
    "For use with parents and guardians of a patient.",
    "Review of Knowledge of Threat",
    2,
    [new Prompt( 
      "What do you know about the threat the patient made or what happened at that time?" ,
      [new Response(null,"text",60001,null),
        new Response("cue 1","checkbox",60002,null),
        new Response("cue 2","checkbox",60003,null),
        new Response("cue 3","checkbox",60004,null)
       ],
      40008,
      null
     ),
     new Prompt( 
      "Have you heard the patient say similar things or behave in similar ways before? Do you have any ideas about what reasons they may have had to say or do what they did? Do you recall the patient doing or saying anything prior to this event that indicated that they felt this way or wanted to harm [intended victim]?" ,
      [new Response(null,"text",60001,null),
        new Response("cue 1","checkbox",60002,null),
        new Response("cue 2","checkbox",60003,null),
        new Response("cue 3","checkbox",60004,null)
       ],
      40009,
      null
     ),
     new Prompt( 
      "Are you familiar with [the intended victim]? What do you know about the patient’s relationship with them?" ,
      [new Response(null,"text",60001,null),
        new Response("cue 1","checkbox",60002,null),
        new Response("cue 2","checkbox",60003,null),
        new Response("cue 3","checkbox",60004,null)
       ],
      40010,
      null
     ),
     new Prompt( 
      "Does the patient have the means to carry out the threat (access to firearms)?" ,
      [new Response(null,"text",60001,null),
        new Response("cue 1","checkbox",60002,null),
        new Response("cue 2","checkbox",60003,null),
        new Response("cue 3","checkbox",60004,null)
       ],
      40011,
      null
     ),
     new Prompt( 
      "Is there anyone else (providers, teachers, peers) who might know about this?" ,
      [new Response(null,"text",60001,null),
      new Response("cue 1","checkbox",60002,null),
      new Response("cue 2","checkbox",60003,null),
      new Response("cue 3","checkbox",60004,null)
     ],
      40008,
      null
     )
   ]
   )],20002,null),
 new Survey("RISC Provider Interview", null, [
  new Section(
    "Provider Threat Review",
    "For use with other providers of a patient.",
    "Review of Knowledge of Threat",
    3,
    [new Prompt( 
      "Role" ,
      [new Response(null,"text",60001,null),
      new Response("cue 1","checkbox",60002,null),
      new Response("cue 2","checkbox",60003,null),
      new Response("cue 3","checkbox",60004,null)
     ],
      40014,
      null
     ),
     new Prompt( 
      "Length of treatment" ,
      [new Response(null,"text",60001,null),
      new Response("cue 1","checkbox",60002,null),
      new Response("cue 2","checkbox",60003,null),
      new Response("cue 3","checkbox",60004,null)
     ],
      40015,
      null
     ),
     new Prompt( 
      "What do you know about the threat the patient made or what happened at that time?" ,
      [new Response(null,"text",60001,null),
      new Response("cue 1","checkbox",60002,null),
      new Response("cue 2","checkbox",60003,null),
      new Response("cue 3","checkbox",60004,null)
     ],
      40016,
      null
     ),
     new Prompt( 
      "Have you heard the patient say similar things or behave in similar ways before? Do you have any ideas about what reasons they may have had to say or do what they did? Do you recall the patient doing or saying anything prior to this event that indicated that they felt this way or wanted to harm [intended victim]?" ,
      [new Response(null,"text",60001,null),
      new Response("cue 1","checkbox",60002,null),
      new Response("cue 2","checkbox",60003,null),
      new Response("cue 3","checkbox",60004,null)
     ],
      40017,
      null
     ),
     new Prompt( 
      "Relationship with Specific Intended Victim(s): How long have you known them? What has happened in the past between you? What do you think they deserve? Do you see any way things could be changed/improved?" ,
      [new Response(null,"text",60001,null),
      new Response("cue 1","checkbox",60002,null),
      new Response("cue 2","checkbox",60003,null),
      new Response("cue 3","checkbox",60004,null)
     ],
      40018,
      null
     )
   ]
   )],20003,null)
];


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
  private surveys$: BehaviorSubject<Survey[]> = new BehaviorSubject<Survey[]>(surveys);
  private answers$:BehaviorSubject<SurveyAnswer[]> = new BehaviorSubject<SurveyAnswer[]>(Answers);

  getCrises() { return this.surveys$; }

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


