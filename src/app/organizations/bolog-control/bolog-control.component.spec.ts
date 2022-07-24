import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BologControlComponent } from './bolog-control.component';

describe('BologControlComponent', () => {
  let component: BologControlComponent;
  let fixture: ComponentFixture<BologControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BologControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BologControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
