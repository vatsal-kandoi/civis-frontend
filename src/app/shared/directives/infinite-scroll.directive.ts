import { Directive, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';

@Directive({ selector: '[appInfiniteScroll]' })
export class InfiniteScrollDirective {
    @Output() scrollEnd = new EventEmitter();
    @Output() scrollTop = new EventEmitter();

    constructor(elem: ElementRef, renderer: Renderer2) {
        const target = elem.nativeElement;
        target.addEventListener('scroll', () => {
            if (target.scrollTop >= (target.scrollHeight - target.offsetHeight) * 0.90) {
                this.scrollEnd.emit(true);
            }
            if (target.scrollTop === 0) {
                this.scrollTop.emit(true);
            }
        });
    }
}

