import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencygroupComponent } from './currencygroup.component';

describe('CurrencygroupComponent', () => {
  let component: CurrencygroupComponent;
  let fixture: ComponentFixture<CurrencygroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencygroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencygroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
