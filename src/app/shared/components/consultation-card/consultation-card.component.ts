import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-consultation-card',
  templateUrl: './consultation-card.component.html',
  styleUrls: ['./consultation-card.component.scss']
})
export class ConsultationCardComponent implements OnInit {
  @Input() consultation: any;
  @Input() type: string;
  
  constructor() { }

  ngOnInit() {
  }
  
  fetchConsultationList() {
    
  }
}
