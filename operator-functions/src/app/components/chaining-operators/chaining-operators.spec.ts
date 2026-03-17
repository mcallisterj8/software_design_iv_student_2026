import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainingOperators } from './chaining-operators';

describe('ChainingOperators', () => {
  let component: ChainingOperators;
  let fixture: ComponentFixture<ChainingOperators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChainingOperators],
    }).compileComponents();

    fixture = TestBed.createComponent(ChainingOperators);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
