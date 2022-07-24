import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadCashComponent } from './load-cash.component';

describe('LoadCashComponent', () => {
  let component: LoadCashComponent;
  let fixture: ComponentFixture<LoadCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadCashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
