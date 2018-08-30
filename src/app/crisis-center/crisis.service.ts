import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

// export class Crisis {
//   constructor(public id: number, public name: string) { }
// }

export class Survey {
  constructor( public SurveyName: string, public SurveyTitle :string, public Sessions:[],public Id: number,public UserName:string) { }
}

const surveys =[
 new Survey( "RISC Patient Interview",null, [],20001,null),
 new Survey("RISC Parent/Guardian Interview",null,[],20002,null),
 new Survey("RISC Provider Interview", null,[],20003,null)
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
