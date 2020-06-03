import { AfterViewInit, Directive, ElementRef, HostBinding, Input } from '@angular/core';
@Directive({
    selector: '[appLazyLoad]'
})
export class LazyLoadDirective implements AfterViewInit {
    @HostBinding('attr.src') srcAttr = null; // can put a link to a small (< 2KB) blurred image here as well
    @Input() src: string;

    constructor(private elem: ElementRef) {
    }

    ngAfterViewInit() {
        this.hasIntersectionObserver() ? this.lazyLoadImage() : this.loadImage();
    }

    private hasIntersectionObserver() {
        return window && 'IntersectionObserver' in window;
    }

    private lazyLoadImage() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(({ isIntersecting }) => {
                if (isIntersecting) {
                    this.loadImage();
                    observer.unobserve(this.elem.nativeElement);
                }
            });
        });
        observer.observe(this.elem.nativeElement);
    }

    private loadImage() {
        this.srcAttr = this.src;
    }
}
