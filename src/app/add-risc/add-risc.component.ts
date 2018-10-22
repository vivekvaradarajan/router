import { Component, OnInit } from '@angular/core';
import { Patient } from '../survey-center/patient';

@Component({
  selector: 'app-add-risc',
  templateUrl: './add-risc.component.html',
  styleUrls: ['./add-risc.component.css']
})
export class AddRiscComponent implements OnInit {
  patient:Patient;

  constructor() { }

  ngOnInit() {
    this.patient = new Patient(0,"","","","","");
  }

}
