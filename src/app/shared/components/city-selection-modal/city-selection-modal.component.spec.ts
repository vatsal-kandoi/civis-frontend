import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySelectionModalComponent } from './city-selection-modal.component';

describe('CitySelectionModalComponent', () => {
  let component: CitySelectionModalComponent;
  let fixture: ComponentFixture<CitySelectionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitySelectionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitySelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
