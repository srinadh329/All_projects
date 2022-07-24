import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardReconciliationComponent } from './reward-reconciliation.component';

describe('RewardReconciliationComponent', () => {
  let component: RewardReconciliationComponent;
  let fixture: ComponentFixture<RewardReconciliationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardReconciliationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardReconciliationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
