import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncPipeExample } from './async-pipe-example';

describe('AsyncPipeExample', () => {
  let component: AsyncPipeExample;
  let fixture: ComponentFixture<AsyncPipeExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsyncPipeExample],
    }).compileComponents();

    fixture = TestBed.createComponent(AsyncPipeExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
