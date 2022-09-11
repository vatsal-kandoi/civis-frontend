import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup-list',
  templateUrl: './popup-list.component.html',
  styleUrls: ['./popup-list.component.scss']
})
export class PopupListComponent implements OnInit, AfterViewInit {

  @Input() menu_type: string = "row"
  @Input() list_label: string = "";
  @Input() childQueryCls: string = "";
  @Output() close_list_popup: EventEmitter<boolean> = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit( ) {
    const listElement: HTMLElement = (document.getElementsByClassName("main-menu-container")[0] as HTMLElement);
    listElement.focus();
    // Close modal when last tab clicked on last button
    this.listenForEventsOnElements(listElement, false);    

    const search_field: any = document.getElementsByClassName(this.childQueryCls);
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
        this.close_list_popup.emit(true);
      } else if(event.key === "Escape") {
        this.close_list_popup.emit(true);
      }
    });
  }
}
