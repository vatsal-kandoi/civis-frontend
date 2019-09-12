import { Component, OnInit, Input } from '@angular/core';
import { fadeIn } from '../../../shared/animations/fade';

@Component({
  selector: 'app-how-civis-works-carousel',
  templateUrl: './how-civis-works-carousel.component.html',
  styleUrls: ['./how-civis-works-carousel.component.scss'],
  animations: [fadeIn]
})
export class HowCivisWorksCarouselComponent implements OnInit {

  @Input() tab: string;
  submitStep = 1;
  consultationStep = 1;

  constructor() { }

  ngOnInit() {
  }
  
  submitNextStep() {
    if(this.submitStep == 2) {
      this.submitStep = 1;
    } else {
      this.submitStep++
    }
  }

  sumbitPreviousStep() {
    if(this.submitStep == 1) {
      this.submitStep = 2;
    } else {
      this.submitStep--
    }
  }
  
  consultationNextStep() {
    if(this.consultationStep == 2) {
      this.consultationStep = 1;
    } else {
      this.consultationStep++
    }
  }
    
  consultationPreviousStep() {
    if(this.consultationStep == 1) {
      this.consultationStep = 2;
    } else {
      this.consultationStep--
    }
  }

  handleSubmitNext() {
    this.submitStep = 2;
  }
   
  handleConsultationNext() {
    this.consultationStep = 2;
  }
}
