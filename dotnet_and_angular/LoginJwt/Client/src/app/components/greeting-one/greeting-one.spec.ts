import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingOne } from './greeting-one';

describe('GreetingOne', () => {
  let component: GreetingOne;
  let fixture: ComponentFixture<GreetingOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetingOne],
    }).compileComponents();

    fixture = TestBed.createComponent(GreetingOne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
