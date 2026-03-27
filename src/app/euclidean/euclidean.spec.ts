import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Euclidean } from './euclidean';

describe('Euclidean', () => {
  let component: Euclidean;
  let fixture: ComponentFixture<Euclidean>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Euclidean]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Euclidean);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
