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
    this.listenForEventsOnElements(document.getElementsByClassName("social-share-options")[0] as HTMLElement, false);    

    const search_field: any = document.getElementsByClassName('share-btn');
    let index = 0;
    for(let shareBtn of search_field) {
      if (index === search_field.length - 1){
        this.listenForEventsOnElements(shareBtn as HTMLElement, true);
      } else { 
        this.listenForEventsOnElements(shareBtn as HTMLElement, false);
      }
      index += 1;
    }
  }

  /**
   * Add listenders to HTML Element and perform actions similar to a modal
   * @param element HTML Element
   * @param closeOnLastTab To add a listener for tab on the last anchor tag
   */
  listenForEventsOnElements(element: HTMLElement, closeOnLastTab: boolean): void {
    element.addEventListener('keydown', (event:KeyboardEvent) => {
      if (event.key === 'Tab' && closeOnLastTab) {
        this.closeShareOptions.emit(true);
      } else if(event.key === "Escape") {
        this.closeShareOptions.emit(true);
      }
    });
  }

}
