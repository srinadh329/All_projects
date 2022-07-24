import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DubaipoliceComponent } from './dubaipolice.component';

describe('DubaipoliceComponent', () => {
  let component: DubaipoliceComponent;
  let fixture: ComponentFixture<DubaipoliceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DubaipoliceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DubaipoliceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
