import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bregman } from './bregman';

describe('Bregman', () => {
  let component: Bregman;
  let fixture: ComponentFixture<Bregman>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bregman]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bregman);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
