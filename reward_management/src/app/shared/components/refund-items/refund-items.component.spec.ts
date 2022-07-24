import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundItemsComponent } from './refund-items.component';

describe('RefundItemsComponent', () => {
  let component: RefundItemsComponent;
  let fixture: ComponentFixture<RefundItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
