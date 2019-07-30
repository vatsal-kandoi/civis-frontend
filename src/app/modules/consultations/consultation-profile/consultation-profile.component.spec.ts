import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationProfileComponent } from './consultation-profile.component';

describe('ConsultationProfileComponent', () => {
  let component: ConsultationProfileComponent;
  let fixture: ComponentFixture<ConsultationProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
