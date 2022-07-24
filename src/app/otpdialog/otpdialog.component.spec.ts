import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpdialogComponent } from './otpdialog.component';

describe('OtpdialogComponent', () => {
  let component: OtpdialogComponent;
  let fixture: ComponentFixture<OtpdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
