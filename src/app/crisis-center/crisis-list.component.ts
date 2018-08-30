import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Survey, CrisisService } from './crisis.service';
import { Observable }            from 'rxjs';
import { switchMap }             from 'rxjs/operators';

// @Component({
//   template: `
//     <ul class="items">
//       <li *ngFor="let crisis of crises$ | async"
//         [class.selected]="crisis.id === selectedId">
//         <a [routerLink]="[crisis.id]">
//           <span class="badge">{{ crisis.id }}</span>{{ crisis.name }}
//         </a>
//       </li>
//     </ul>

//     <router-outlet></router-outlet>
//   `
// })
@Component({
  template: `
    <ul class="items">
      <li *ngFor="let crisis of surveys$ | async"
        [class.selected]="crisis.Id === selectedId">
        <a [routerLink]="[crisis.Id]">
          <span class="badge">{{ crisis.Id }}</span>{{ crisis.SurveyName }}
        </a>
      </li>
    </ul>

    <router-outlet></router-outlet>
  `
})
export class CrisisListComponent implements OnInit {
  surveys$: Observable<Survey[]>;
  selectedId: number;

  constructor(
    private service: CrisisService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.surveys$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.selectedId = +params.get('id');
        return this.service.getCrises();
      })
    );
  }
}
