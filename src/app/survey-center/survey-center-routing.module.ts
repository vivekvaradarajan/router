import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { surveyCenterHomeComponent } from './survey-center-home.component';
import { surveyListComponent }       from './survey-list.component';
import { surveyCenterComponent }     from './survey-center.component';
import { surveyDetailComponent }     from './survey-detail.component';

import { CanDeactivateGuard }     from '../can-deactivate-guard.service';
import { surveyDetailResolver }   from './survey-detail-resolver.service';

const surveyCenterRoutes: Routes = [
  {
    path: 'haa/:id',
    component:surveyCenterHomeComponent
  },
  {
    path: '',
    component: surveyCenterComponent,
    children: [
      {
        path: '',
        component: surveyListComponent,
        children: [
          {
            path: ':id',
            component: surveyDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              survey: surveyDetailResolver
            }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(surveyCenterRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    surveyDetailResolver
  ]
})
export class surveyCenterRoutingModule { }
