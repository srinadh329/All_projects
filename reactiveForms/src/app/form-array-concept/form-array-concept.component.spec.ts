import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrayConceptComponent } from './form-array-concept.component';

describe('FormArrayConceptComponent', () => {
  let component: FormArrayConceptComponent;
  let fixture: ComponentFixture<FormArrayConceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormArrayConceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArrayConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
