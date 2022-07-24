import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalBondComponent } from './nationalbond.component';

describe('nationalbondapplication', () => {
  let component: NationalBondComponent;
  let fixture: ComponentFixture<NationalBondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NationalBondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalBondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
