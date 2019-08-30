import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'civis';

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.setDisqus();

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
         window.scrollTo(0, 0)
      }
    });
    
  }


  setDisqus() {

  }

}
