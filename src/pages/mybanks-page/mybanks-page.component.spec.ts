import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MybanksPageComponent } from './mybanks-page.component';

describe('MybanksPageComponent', () => {
  let component: MybanksPageComponent;
  let fixture: ComponentFixture<MybanksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MybanksPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MybanksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
