import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationCardComponent } from './consultation-card.component';

describe('ConsultationCardComponent', () => {
  let component: ConsultationCardComponent;
  let fixture: ComponentFixture<ConsultationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
