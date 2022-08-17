import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  @ViewChild('loginForm', {static: false}) loginForm: NgForm;
  @ViewChild('loginForm', { read: ElementRef }) loginFormElemRef: ElementRef;
  loginObject = {
    email: '',
    password: ''
  };
  
  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    if (!this.loginForm.valid) this.loginFormElemRef.nativeElement.querySelector('.ng-invalid').focus()
    else this.onSubmit.emit(this.loginObject);  
  }
}
