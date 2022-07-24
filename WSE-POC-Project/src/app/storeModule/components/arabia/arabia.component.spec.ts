import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArabiaComponent } from './arabia.component';

describe('ArabiaComponent', () => {
  let component: ArabiaComponent;
  let fixture: ComponentFixture<ArabiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArabiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArabiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
