import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'civis';
  showCitySelection: boolean;

  constructor(
    private userService: UserService,
  ) {

  }

  ngOnInit() {
    this.checkCityPresent();
  }


  checkCityPresent() {
    this.userService.forceCitySelection$
    .pipe(
      filter((data) => data !== null)
    )
    .subscribe(res => {
      if (res) {
        this.showCitySelection = true;
      }
    });
  }

}
