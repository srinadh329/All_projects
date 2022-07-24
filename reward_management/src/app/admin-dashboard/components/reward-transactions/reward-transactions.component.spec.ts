import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardTransactionsComponent } from './reward-transactions.component';

describe('RewardTransactionsComponent', () => {
  let component: RewardTransactionsComponent;
  let fixture: ComponentFixture<RewardTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
