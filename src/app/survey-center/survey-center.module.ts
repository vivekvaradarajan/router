import { NgModule }       from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { CommonModule }   from '@angular/common';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { surveyService }        from './survey.service';

import { surveyCenterComponent }     from './survey-center.component';
import { surveyListComponent }       from './survey-list.component';
import { surveyCenterHomeComponent } from './survey-center-home.component';
import { surveyDetailComponent }     from './survey-detail.component';

import { surveyCenterRoutingModule } from './survey-center-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent, NgbdModalContent } from '../modal-component';
import { AppComponent } from '../app.component';

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
    surveyCenterRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  declarations: [
    surveyCenterComponent,
    surveyListComponent,
    surveyCenterHomeComponent,
    surveyDetailComponent,
    NgbdModalComponent, NgbdModalContent
  ],
  providers: [
    surveyService
  ],
  entryComponents: [NgbdModalContent],

})
export class surveyCenterModule {

  
}
