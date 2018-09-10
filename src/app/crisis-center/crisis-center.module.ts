import { NgModule }       from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CrisisService }        from './crisis.service';

import { CrisisCenterComponent }     from './crisis-center.component';
import { CrisisListComponent }       from './crisis-list.component';
import { CrisisCenterHomeComponent } from './crisis-center-home.component';
import { CrisisDetailComponent }     from './crisis-detail.component';

import { CrisisCenterRoutingModule } from './crisis-center-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CrisisCenterRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    CrisisCenterComponent,
    CrisisListComponent,
    CrisisCenterHomeComponent,
    CrisisDetailComponent
  ],
  providers: [
    CrisisService
  ]
})
export class CrisisCenterModule {}
