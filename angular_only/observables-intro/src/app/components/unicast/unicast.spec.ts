import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unicast } from './unicast';

describe('Unicast', () => {
  let component: Unicast;
  let fixture: ComponentFixture<Unicast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unicast],
    }).compileComponents();

    fixture = TestBed.createComponent(Unicast);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
