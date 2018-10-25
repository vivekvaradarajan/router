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
    console.log(this.surveyAnswer);
  }

  saveAnswer(): void {
    console.log(JSON.stringify(this.surveyAnswer));
    this.surveyService.saveAnswer(this.surveyAnswer).subscribe(result => console.log(result));

    this.activeModal.close('Close click');
    this.hasSaved = true;
 }

}
