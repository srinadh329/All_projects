import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusmainComponent } from './aboutusmain.component';

describe('AboutusmainComponent', () => {
  let component: AboutusmainComponent;
  let fixture: ComponentFixture<AboutusmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutusmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
