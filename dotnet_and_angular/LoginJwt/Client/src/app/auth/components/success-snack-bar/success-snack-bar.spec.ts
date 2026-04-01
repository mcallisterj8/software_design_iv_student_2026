import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSnackBar } from './success-snack-bar';

describe('SuccessSnackBar', () => {
  let component: SuccessSnackBar;
  let fixture: ComponentFixture<SuccessSnackBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessSnackBar],
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessSnackBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
