import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  covercardData: any;
  cardData = [
    {
      cardImg: 'http://sf.co.ua/14/09/wallpaper-1341205.jpg',
      title: 'National Urban Policy Framework, 2018',
      subTitle: 'Ministry of Housing & Urban Affairs',
      days: '12 Days Remaining',
      response: '6,712 Responses so far' 
    },
    {
      cardImg: 'http://sf.co.ua/14/09/wallpaper-1341205.jpg',
      title: 'Revised marital laws',
      subTitle: 'Ministry of Housing & Urban Affairs',
      days: '31 Days Remaining',
      response: '6,712 Responses so far' 
    },
    {
      cardImg: 'http://sf.co.ua/14/09/wallpaper-1341205.jpg',
      title: 'Tax rebate to PAN card holders',
      subTitle: 'Ministry of Housing & Urban Affairs',
      days: '42 Days Remaining',
      response: '6,712 Responses so far' 
    }
  ]
  constructor() { }
  
  ngOnInit() {
    this.covercardData = this.cardData[0];
  }
  
  showCard(index) {
    this.covercardData = this.cardData[index];
  }
}
