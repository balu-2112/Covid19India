import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiamapComponent } from './indiamap.component';

describe('IndiamapComponent', () => {
  let component: IndiamapComponent;
  let fixture: ComponentFixture<IndiamapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiamapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiamapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
