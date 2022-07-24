import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableFilterComponent } from './admin-table-filter.component';

describe('AdminTableFilterComponent', () => {
  let component: AdminTableFilterComponent;
  let fixture: ComponentFixture<AdminTableFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTableFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTableFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
