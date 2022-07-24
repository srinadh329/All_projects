import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationmapsComponent } from './locationmaps.component';

describe('LocationmapsComponent', () => {
  let component: LocationmapsComponent;
  let fixture: ComponentFixture<LocationmapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationmapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationmapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
