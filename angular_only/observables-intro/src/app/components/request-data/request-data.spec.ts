import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestData } from './request-data';

describe('RequestData', () => {
  let component: RequestData;
  let fixture: ComponentFixture<RequestData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestData],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestData);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
