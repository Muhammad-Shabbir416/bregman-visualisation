import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlComponent } from './kl';

describe('KlComponent', () => {
  let component: KlComponent;
  let fixture: ComponentFixture<KlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
