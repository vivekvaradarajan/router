import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';

import { Survey, surveyService }  from './survey.service';

@Injectable()
export class surveyDetailResolver implements Resolve<Survey> {
  constructor(private cs: surveyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Survey> {
    let id = route.paramMap.get('id');

    return this.cs.getsurvey(id).pipe(
      take(1),
      map(survey => {
        if (survey) {
          console.log("resolvinggg",survey);
          return survey;
        } else { // id not found
          this.router.navigate(['/survey-center']);
          return null;
        }
      })
    );
  }
}
