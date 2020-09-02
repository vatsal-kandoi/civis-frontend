import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationQuestionnaireComponent } from './consultation-questionnaire.component';

describe('ConsultationQuestionnaireComponent', () => {
  let component: ConsultationQuestionnaireComponent;
  let fixture: ComponentFixture<ConsultationQuestionnaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationQuestionnaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultationQuestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
