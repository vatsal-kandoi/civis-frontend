import { Directive, ElementRef, AfterViewInit, AfterContentInit, AfterViewChecked, Input } from '@angular/core';
import { GraphqlService } from 'src/app/graphql/graphql.service';

@Directive({
  selector: '[appDefaultImage]'
})
export class DefaultImageDirective implements AfterViewInit, AfterViewChecked {

  @Input() type: string;

  ele: HTMLImageElement;

  constructor(
    private elr: ElementRef,
    private graphqlService: GraphqlService,
  ) {
    this.ele = this.elr.nativeElement;
   }

   ngAfterViewChecked(): void {
     if ((this.ele.src && this.ele.src !== this.graphqlService.host + '/null')
      || (this.ele.style.backgroundImage && this.ele.style.backgroundImage !== this.graphqlService.host + '/null')) {
      return;
     }
     this.setDefaultImage();
   }

   ngAfterViewInit(): void {
    if ((this.ele.src && this.ele.src !== this.graphqlService.host + '/null')
    || (this.ele.style.backgroundImage && this.ele.style.backgroundImage !== this.graphqlService.host + '/null')) {
      return;
    }
    this.setDefaultImage();
   }

   setDefaultImage() {
    switch (this.type) {
      case 'user':
        this.ele.src = './assets/images/person-default.svg';
        break;
      case 'consultation-cover':
        if (this.ele.tagName === 'IMG') {
          this.ele.src = 'https://storage.googleapis.com/civis-api-static/ministry-cover-photos/8-conversation-02.png';
          return;
        } else {
          this.ele.style.backgroundImage =
          'url(https://storage.googleapis.com/civis-api-static/ministry-cover-photos/8-conversation-02.png)';
        }
        break;
    }
   }


}
