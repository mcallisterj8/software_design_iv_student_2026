import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingThree } from './greeting-three';

describe('GreetingThree', () => {
  let component: GreetingThree;
  let fixture: ComponentFixture<GreetingThree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetingThree],
    }).compileComponents();

    fixture = TestBed.createComponent(GreetingThree);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
