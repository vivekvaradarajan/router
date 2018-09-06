import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Survey, CrisisService } from './crisis.service';
import { Observable }            from 'rxjs';
import { switchMap }             from 'rxjs/operators';

@Component({
  template: `
    <nav class="sub-menu" >
      <a *ngFor="let crisis of surveys$ | async" [routerLink]="[crisis.Id]" [class.selected]="crisis.Id === selectedId" routerLinkActive="active">{{crisis.SurveyName}}</a>
    </nav>

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
