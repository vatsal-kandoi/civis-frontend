import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild('menuModal') menuModal;

  constructor() { }

  ngOnInit() {
  }

  openMenu() {
    this.menuModal.show();
  }

  closeMenu() {
    this.menuModal.hide();
  }

}
