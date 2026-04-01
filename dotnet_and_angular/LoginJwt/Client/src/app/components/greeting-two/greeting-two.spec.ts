import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetingTwo } from './greeting-two';

describe('GreetingTwo', () => {
  let component: GreetingTwo;
  let fixture: ComponentFixture<GreetingTwo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetingTwo],
    }).compileComponents();

    fixture = TestBed.createComponent(GreetingTwo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
