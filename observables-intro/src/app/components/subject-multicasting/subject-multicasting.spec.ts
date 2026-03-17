import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectMulticasting } from './subject-multicasting';

describe('SubjectMulticasting', () => {
  let component: SubjectMulticasting;
  let fixture: ComponentFixture<SubjectMulticasting>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectMulticasting],
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectMulticasting);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
