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
      ministry: {
        name: 'Ministry of Housing & Urban Affairs',
        coverPhoto: {
          url: 'http://sf.co.ua/14/09/wallpaper-1341205.jpg'
        }
      },
      title: 'National Urban Policy Framework, 2018',
      days: '12 Days Remaining',
      response: '6,712 Responses so far' 
    },

    {
      ministry: {
        name: 'Ministry of Housing & Urban Affairs',
        coverPhoto: {
          url: 'http://sf.co.ua/14/09/wallpaper-1341205.jpg'
        }
      },
      title: 'National Urban Policy Framework, 2018',
      days: '12 Days Remaining',
      response: '6,712 Responses so far' 
    },

    {
       ministry: {
        name: 'Ministry of Housing & Urban Affairs',
        coverPhoto: {
          url: 'http://sf.co.ua/14/09/wallpaper-1341205.jpg'
        }
      },
      title: 'National Urban Policy Framework, 2018',
      days: '12 Days Remaining',
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
