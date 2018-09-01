import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { slideInDownAnimation }   from '../animations';
import { Survey,Section,Response,Prompt }         from './crisis.service';
import { DialogService }  from '../dialog.service';

import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
@Component({
  templateUrl:'./crisis-detail.component.html',
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
  // orders = [
  //   { id: 50002, name: 'order 1' },
  //   { id: 50003, name: 'order 2' },
  //   { id: 50004, name: 'order 3' }
  // ];
//Label, Type, Id
  orders=[new Response("cue 1","checkbox",50002,null),
  new Response("cue 2","checkbox",50003,null),
  new Response("cue 3","checkbox",50004,null)
 ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialogService: DialogService,
    private formBuilder:FormBuilder
  ) {

    const controls = this.orders.map(c => new FormControl(false));
    // controls[0].setValue(true);


    this.form = this.formBuilder.group({
      orders: new FormArray(controls, minSelectedCheckboxes(1))
    });
  }

  
  submit() {
    const selectedOrderIds = this.form.value.orders
      .map((v, i) => v ? this.orders[i].Id : null)
      .filter(v => v !== null);
  
    console.log(selectedOrderIds);
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
