import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincreatehomebannerComponent } from './admincreatehomebanner.component';

describe('AdmincreatehomebannerComponent', () => {
  let component: AdmincreatehomebannerComponent;
  let fixture: ComponentFixture<AdmincreatehomebannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmincreatehomebannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmincreatehomebannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
