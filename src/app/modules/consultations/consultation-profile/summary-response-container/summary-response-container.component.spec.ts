import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryResponseContainerComponent } from './summary-response-container.component';

describe('SummaryResponseContainerComponent', () => {
  let component: SummaryResponseContainerComponent;
  let fixture: ComponentFixture<SummaryResponseContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryResponseContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryResponseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
