import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

// export class Crisis {
//   constructor(public id: number, public name: string) { }
// }

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

const surveys =[
 new Survey( "RISC Patient Interview","Titallll", [
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
        "What halallallarm someone? Did you say anything or do anything that prompted that worry? What did you say [exact wording] or do? What did you mean by that?" ,
        [new Response(null,"text",50001,null),
        new Response("cue 1","checkbox",50002,null),
        new Response("cue 2","checkbox",50003,null),
        new Response("cue 3","checkbox",50004,null)
       ],
        40002,
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
      [new Response(null,"text",50001,null)],
      40001,
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
      [new Response(null,"text",50001,null)],
      40001,
      null
     )
   ]
   )],20003,null)
];

// const CRISES = [
//   new Crisis(1, 'Dragon Burning Cities'),
//   new Crisis(2, 'Sky Rains Great White Sharks'),
//   new Crisis(3, 'Giant Asteroid Heading For Earth'),
//   new Crisis(4, 'Procrastinators Meeting Delayed Again'),
// ];

import { Injectable } from '@angular/core';


@Injectable()
export class CrisisService {
  static nextCrisisId = 100;
  // private crises$: BehaviorSubject<Crisis[]> = new BehaviorSubject<Crisis[]>(CRISES);
  private surveys$: BehaviorSubject<Survey[]> = new BehaviorSubject<Survey[]>(surveys);

  getCrises() { return this.surveys$; }

  getCrisis(id: number | string) {
    return this.getCrises().pipe(
      map(crises => crises.find(crisis => crisis.Id === +id))
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
}
