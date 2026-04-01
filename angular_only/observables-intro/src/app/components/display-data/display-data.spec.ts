import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayData } from './display-data';

describe('DisplayData', () => {
  let component: DisplayData;
  let fixture: ComponentFixture<DisplayData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayData],
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
