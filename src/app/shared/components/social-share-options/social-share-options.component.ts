import { EventEmitter, AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { getSocialLink } from 'src/app/modules/consultations/consultation-profile/socialLink.function';

@Component({
  selector: 'app-social-share-options',
  templateUrl: './social-share-options.component.html',
  styleUrls: ['./social-share-options.component.scss']
})
export class SocialShareOptionsComponent implements OnInit, AfterViewInit {

  @Input("url") url;
  @Input("title") title;
  @Input("nodeID") nodeID;

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

  /**
   * Return the URL to share on a particular social channel
   * @param socialType Social Share option
   * @returns URL
   */
  getSocialURL(socialType) {
    if(socialType === "facebook") {
      return getSocialLink("facebook", this.url, this.title);
    } else if( socialType === "twitter") {
      return getSocialLink("twitter", this.url, this.title, this.nodeID )
    } else if (socialType === "whatsapp") {
      return getSocialLink('whatsapp', this.url, this.title);
    } else if (socialType === "linkedin") {
      return getSocialLink('linkedin', this.url, this.title);
    }
  }
}
