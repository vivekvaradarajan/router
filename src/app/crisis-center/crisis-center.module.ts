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
export class AnswerSet
{
    SurveyName:string;
    SectionSet:SectionSet[];
    constructor(SurveyName:string,
      SectionSet:SectionSet[]){
            this.SurveyName = SurveyName;
            this.SectionSet = SectionSet;
        }
}
export class SectionSet{
  Title:string;
  Order:number;
  Prompts:PromptSet[];
  constructor(Title:string,Order:number,Prompts:PromptSet[]){
    this.Title = Title;
    this.Order= Order;
    this.Prompts= Prompts;
  }
}
export class PromptSet{
  Text:string;
  ResponseSet:ResponseSet[];
  constructor(Text:string,ResponseSet:ResponseSet[]){
    this.Text = Text;
    this.ResponseSet = ResponseSet;
  }
}
export class ResponseSet{
  Label:string;
  Value:string;
  Type:string;
  constructor(Label:string,Value:string,Type:string){
    this.Label = Label;
    this.Value = Value;
    this.Type = Type;
  }
}

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
export class CrisisCenterModule {

  
}
