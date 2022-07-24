import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecoverComponent } from './admin-recover.component';

describe('AdminRecoverComponent', () => {
  let component: AdminRecoverComponent;
  let fixture: ComponentFixture<AdminRecoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRecoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRecoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
