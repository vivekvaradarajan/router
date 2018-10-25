import { Component, OnInit } from '@angular/core';
import {surveyService} from '../survey-center/survey.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-about',
  templateUrl: './modal-about.component.html',
  styleUrls: ['./modal-about.component.css']
})
export class ModalAboutComponent implements OnInit {
  constructor(private surveyService: surveyService,public activeModal: NgbActiveModal) { }

  ngOnInit() {
   
  }
}
