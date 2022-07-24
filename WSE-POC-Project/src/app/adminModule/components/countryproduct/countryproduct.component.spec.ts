import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryproductComponent } from './countryproduct.component';

describe('CountryproductComponent', () => {
  let component: CountryproductComponent;
  let fixture: ComponentFixture<CountryproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
