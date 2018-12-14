import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeRecommendComponent } from './we-recommend.component';

describe('WeRecommendComponent', () => {
  let component: WeRecommendComponent;
  let fixture: ComponentFixture<WeRecommendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeRecommendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeRecommendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
