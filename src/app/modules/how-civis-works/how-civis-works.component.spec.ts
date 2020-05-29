import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowCivisWorksComponent } from './how-civis-works.component';

describe('HowCivisWorksComponent', () => {
  let component: HowCivisWorksComponent;
  let fixture: ComponentFixture<HowCivisWorksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowCivisWorksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowCivisWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
