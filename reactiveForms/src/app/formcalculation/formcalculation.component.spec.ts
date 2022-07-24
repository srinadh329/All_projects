import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormcalculationComponent } from './formcalculation.component';

describe('FormcalculationComponent', () => {
  let component: FormcalculationComponent;
  let fixture: ComponentFixture<FormcalculationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormcalculationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormcalculationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
