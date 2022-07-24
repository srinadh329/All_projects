import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCalComponent } from './form-cal.component';

describe('FormCalComponent', () => {
  let component: FormCalComponent;
  let fixture: ComponentFixture<FormCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
