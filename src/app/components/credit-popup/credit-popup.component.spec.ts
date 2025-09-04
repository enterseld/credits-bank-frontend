import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPopupComponent } from './credit-popup.component';

describe('CreditPopupComponent', () => {
  let component: CreditPopupComponent;
  let fixture: ComponentFixture<CreditPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
