import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Directive({
  selector: '[appSearchInput]'
})
export class SearchInputDirective {

  private _text: string;
  searchInputUpdated: Subject<string> = new Subject();
  searchChangeEmitter: Observable<string>;
  @Output() inputChanged = new EventEmitter();
  @Input()
  set text(text: string) {
    this._text = text;
    this.searchInputUpdated.next(this._text);
  }

  get text(): string {
    return this._text;
  }

  constructor() {
    this.subscribeToSearchInput();
  }

  subscribeToSearchInput() {
    this.searchChangeEmitter = this.searchInputUpdated.asObservable()
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      );

    this.searchChangeEmitter.subscribe(searchInput => {
      this.inputChanged.emit(searchInput);
    });
  }
}
