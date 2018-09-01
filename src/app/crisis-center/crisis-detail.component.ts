import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { slideInDownAnimation }   from '../animations';
import { Survey,Section,Response,Prompt }         from './crisis.service';
import { DialogService }  from '../dialog.service';

import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
@Component({
  template: `
  <div *ngIf="crisis">
    <h3>"{{ editName }}"</h3>
    <div>
      <label>Id: </label>{{ crisis.Id }}</div>
    <div>
      <label>Name: </label>
      <input [(ngModel)]="editName" placeholder="name"/>
{{crisis.SurveyTitle}}
      <ul>
      this is details
  
      <li *ngFor="let section of crisis.Sections">
        <!-- <a [routerLink]="[section.Id]">
          <span class="badge">{{ section.Id }}</span>{{ section.Title }}
         </a>-->
         <h2>{{section.Title}}</h2>
        <div>
        <ul>
        <li *ngFor="let prompt of section.Prompts">
          {{prompt.PromptText}}
          <p *ngFor="let response of prompt.ResponseSet">
          {{response.Label}}
          {{response.Type}}
          {{response.Id}}
          </p>
        
        </li>
        </ul>
        </div>
      </li>
    </ul>


    </div>
    <p>
      <button (click)="save()">Save</button>
      <button (click)="cancel()">Cancel</button>
    </p>
  </div>

  <form [formGroup]="form" (ngSubmit)="submit()">
  <label formArrayName="orders" *ngFor="let order of form.controls.orders.controls; let i = index">
    <input type="checkbox" [formControlName]="i">
    {{orders[i].name}}
  </label>

  <div *ngIf="!form.valid">At least one order must be selected</div>
  <br>
  <button [disabled]="!form.valid">submit</button>
</form>

  `,
  styles: ['input {width: 20em}'],
  animations: [ slideInDownAnimation ]
})
export class CrisisDetailComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  crisis: Survey;
  editName: string;
  title:string;


  form: FormGroup;
  orders = [
    { id: 100, name: 'order 1' },
    { id: 200, name: 'order 2' },
    { id: 300, name: 'order 3' },
    { id: 400, name: 'order 4' }
  ];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,
    private formBuilder:FormBuilder
  ) {

    const controls = this.orders.map(c => new FormControl(false));
    controls[0].setValue(true);

    this.form = this.formBuilder.group({
      orders: new FormArray(controls, minSelectedCheckboxes(1))
    });
  }

  
  ngOnInit() {
    this.route.data
      .subscribe((data: { crisis: Survey }) => {
        this.editName = data.crisis.SurveyName;
        this.crisis = data.crisis;
        this.title = data.crisis.SurveyTitle;
      });
  }

  cancel() {
    this.gotoCrises();
  }

  save() {
    this.crisis.SurveyName = this.editName;
    this.gotoCrises();
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.crisis || this.crisis.SurveyName === this.editName) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  gotoCrises() {
    let crisisId = this.crisis ? this.crisis.Id : null;
    // Pass along the crisis id if available
    // so that the CrisisListComponent can select that crisis.
    // Add a totally useless `foo` parameter for kicks.
    // Relative navigation back to the crises
    this.router.navigate(['../', { id: crisisId, foo: 'foo' }], { relativeTo: this.route });
  }

  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => v ? this.orders[i].id : null)
      .filter(v => v !== null);
  
    console.log(selectedOrderIds);
  }
  
}



function minSelectedCheckboxes(min = 1) {
const validator: ValidatorFn = (formArray: FormArray) => {
  const totalSelected = formArray.controls
    .map(control => control.value)
    .reduce((prev, next) => next ? prev + next : prev, 0);

  return totalSelected >= min ? null : { required: true };
};

return validator;
}
