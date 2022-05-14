import { Component, OnInit } from '@angular/core';
import { SignupForm } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  currentUser: any;

  constructor( private authService: AuthService ) { }

  ngOnInit() { }

  /**
   * Calls the sign-up service to sign-up user to the Civis platform
   * @param $event SignupForm 
   */
  submitSignupForm($event: SignupForm) {
    if (!$event) return;
    this.authService.signupUser($event);
  }
}
