import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, AfterViewInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Input() triggerFocusToFirstElement: boolean = false;

  @ViewChild('loginForm', {static: false}) loginForm: NgForm;
  @ViewChild('loginForm', { read: ElementRef }) loginFormElemRef: ElementRef;
  loginObject = {
    email: '',
    password: ''
  };
  
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if(this.triggerFocusToFirstElement) {
      ((this.loginFormElemRef.nativeElement.getElementsByClassName('input-box__border')[0] as HTMLElement).firstChild as HTMLElement).focus();
    }
  }

  submit() {
    if (!this.loginForm.valid) this.loginFormElemRef.nativeElement.querySelector('.ng-invalid').focus()
    else this.onSubmit.emit(this.loginObject);  
  }
}
