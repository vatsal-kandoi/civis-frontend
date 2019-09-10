import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-how-civis-works',
  templateUrl: './how-civis-works.component.html',
  styleUrls: ['./how-civis-works.component.scss']
})
export class HowCivisWorksComponent implements OnInit {

  @ViewChild('addConultationSection', { read: ElementRef , static: false }) addConultationSection: ElementRef<any>;

  constructor() { }

  ngOnInit() {
  }

  scrollToResponses() {
    window.scrollTo({
      top: document.scrollingElement.scrollTop + this.addConultationSection.nativeElement.getBoundingClientRect().top - 100,
      behavior: 'smooth',
    })
  }
}
