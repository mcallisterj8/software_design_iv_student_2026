import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeAndOperators } from './pipe-and-operators';

describe('PipeAndOperators', () => {
  let component: PipeAndOperators;
  let fixture: ComponentFixture<PipeAndOperators>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipeAndOperators],
    }).compileComponents();

    fixture = TestBed.createComponent(PipeAndOperators);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
