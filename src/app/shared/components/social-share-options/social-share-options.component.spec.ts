import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialShareOptionsComponent } from './social-share-options.component';

describe('SocialShareOptionsComponent', () => {
  let component: SocialShareOptionsComponent;
  let fixture: ComponentFixture<SocialShareOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialShareOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialShareOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
