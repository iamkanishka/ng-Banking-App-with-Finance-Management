import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranferFundPageComponent } from './tranfer-fund-page.component';

describe('TranferFundPageComponent', () => {
  let component: TranferFundPageComponent;
  let fixture: ComponentFixture<TranferFundPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranferFundPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TranferFundPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
