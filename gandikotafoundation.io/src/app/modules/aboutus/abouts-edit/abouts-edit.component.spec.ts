import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutsEditComponent } from './abouts-edit.component';

describe('AboutsEditComponent', () => {
  let component: AboutsEditComponent;
  let fixture: ComponentFixture<AboutsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
