import { EventEmitter, AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-social-share-options',
  templateUrl: './social-share-options.component.html',
  styleUrls: ['./social-share-options.component.scss']
})
export class SocialShareOptionsComponent implements OnInit, AfterViewInit {

  @Input("socialShareLinkMap") socialShareLinkMap: { facebook: string, twitter: string, whatsapp: string, linkedin: string } = { 
      "facebook": "",
      "twitter": "",
      "whatsapp": "",
      "linkedin": "",
  };
  
  @Output("closeShareOptions") closeShareOptions: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit( ) {
    (document.getElementsByClassName("social-share-options")[0] as HTMLElement).focus();
    // Close modal when last tab clicked on last button
    const search_field = document.getElementsByClassName('share-btn');
    search_field[ search_field.length - 1 ]?.addEventListener('keydown', (event:KeyboardEvent) => {
      if (event.key === 'Tab') {
        this.closeShareOptions.emit(true);
      }
    });
  }
}
