import { Component,  OnInit } from '@angular/core';
import { LoginForm } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private authService: AuthService ) { }

  ngOnInit() {}
  
  submitLoginForm($event: LoginForm) {
    if (!$event) return;
    this.authService.loginUser($event);
  }
}
