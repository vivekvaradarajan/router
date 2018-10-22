import { Component, OnInit } from '@angular/core';
import { Patient } from '../survey-center/patient';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {surveyService} from '../survey-center/survey.service';

@Component({
  selector: 'app-add-risc',
  templateUrl: './add-risc.component.html',
  styleUrls: ['./add-risc.component.css'],
  providers: [surveyService]
})


export class AddRiscComponent implements OnInit {
  patient:Patient;

  constructor(private service: surveyService) { }

  ngOnInit() {
    this.patient = new Patient(0,"","","","","");
  }

  savePatient(patient:Patient){
    this.service.savePatient(patient)
    .subscribe(patient => console.log('result',patient));
  }

  
}
