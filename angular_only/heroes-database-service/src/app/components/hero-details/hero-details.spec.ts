import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroDetails } from './hero-details';

describe('HeroDetails', () => {
  let component: HeroDetails;
  let fixture: ComponentFixture<HeroDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(HeroDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
