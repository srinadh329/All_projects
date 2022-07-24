import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrinadhtwoComponent } from './srinadhtwo.component';

describe('SrinadhtwoComponent', () => {
  let component: SrinadhtwoComponent;
  let fixture: ComponentFixture<SrinadhtwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrinadhtwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrinadhtwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
