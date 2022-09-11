import { EventEmitter, Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-social-share-options',
  templateUrl: './social-share-options.component.html',
  styleUrls: ['./social-share-options.component.scss']
})
export class SocialShareOptionsComponent implements OnInit {

  @Input("socialShareLinkMap") socialShareLinkMap: { facebook: string, twitter: string, whatsapp: string, linkedin: string } = { 
      "facebook": "",
      "twitter": "",
      "whatsapp": "",
      "linkedin": "",
  };
  
  @Output("closeShareOptions") closeShareOptions: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  closeOptions($event){ 
    this.closeShareOptions.emit($event);
  }
}
