import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrinadhComponent } from './srinadh.component';

describe('SrinadhComponent', () => {
  let component: SrinadhComponent;
  let fixture: ComponentFixture<SrinadhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SrinadhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SrinadhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
