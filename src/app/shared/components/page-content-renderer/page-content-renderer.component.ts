import { Component, OnInit, Input, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-page-content-renderer',
  templateUrl: './page-content-renderer.component.html',
  styleUrls: ['./page-content-renderer.component.scss']
})
export class PageContentRendererComponent implements OnInit, AfterViewChecked {

  @Input() page: any;
  finalHtml = '';

  constructor(
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.sanitizeUrl();
  }

  ngAfterViewChecked() {
    this.addAttribute();
  }

  sanitizeUrl() {
    if (this.page.components.length) {
      this.page.components.forEach(component => {
        if (component.componentType === 'Embed') {
          component.sanitized_url = this.urlSanitizer(component.content);
          this.cdRef.detectChanges();
        }
      });
    }
  }

  urlSanitizer(url: string) {
    return  url.includes('https:') ? this.sanitizer.bypassSecurityTrustResourceUrl(url) :
      this.sanitizer.bypassSecurityTrustResourceUrl(`https:${url}`);
  }

  getListItems(items: any, index: number, type: string) {
    if (!items) {
      return;
    }
    const el = `<li class="ff-lato">${items[index].content}</li>`;
    this.finalHtml += el;

    if (items[index + 1] && items[index + 1].componentType === type) {
      return null;
    } else {
      const result = this.finalHtml;
      this.finalHtml = '';
      return result;
    }
  }

  trackByFn(index, item) {
    return index;
  }

  addAttribute() {
    const elementCollections = document.getElementsByClassName('para');
    for (let i = 0; i < elementCollections.length; i++) {
      const anchorElements = elementCollections[0].getElementsByTagName('a');
      for (let j = 0; j < anchorElements.length; j++) {
        anchorElements[j].setAttribute('target', '_blank');
      }
    }
  }

}
