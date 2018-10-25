import { Component, Input, OnInit } from '@angular/core';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {surveyService} from '../survey-center/survey.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() title = `Information`;

  surveyAnswer;

  constructor(private surveyService: surveyService,public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.surveyAnswer = this.surveyService.retrieveTempAnswer();
  }

  saveAnswer(): void {
    console.log(JSON.stringify(this.surveyAnswer));
    this.surveyService.saveAnswer(this.surveyAnswer).subscribe(result => console.log(result));

    this.activeModal.close('Close click');
 }

}
