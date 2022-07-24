import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantcashComponent } from './instantcash.component';

describe('InstantcashComponent', () => {
  let component: InstantcashComponent;
  let fixture: ComponentFixture<InstantcashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantcashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantcashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
