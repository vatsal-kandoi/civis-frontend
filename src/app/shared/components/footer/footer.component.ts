import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  languages = [
    {
    id: 'en',
    name: 'English'
    },
    {
      id: 'hi',
      name: 'Hindi'
    }
  ];

  selectedLanguage = 'en';

  constructor(private _cookieService: CookieService) {
    const currentLanguage = this._cookieService.get('civisLang');
    if (currentLanguage) {
      this.selectedLanguage = currentLanguage;
    }
   }

  ngOnInit() {
  }

  setLanguage() {
    this._cookieService.put('civisLang', this.selectedLanguage);
    window.location.reload();
    window.scrollTo(0, 0);
  }

}
