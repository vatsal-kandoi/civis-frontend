import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hidden-text',
  templateUrl: './hidden-text.component.html',
  styleUrls: ['./hidden-text.component.scss']
})
export class HiddenTextComponent implements OnInit {

  @Input( "main_class" ) main_class: string;
  @Input( "main_text" ) main_text: string;
  @Input( "accessibility_text" ) accessibility_text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
