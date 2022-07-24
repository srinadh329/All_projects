import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelledRewardsComponent } from './cancelled-rewards.component';

describe('CancelledRewardsComponent', () => {
  let component: CancelledRewardsComponent;
  let fixture: ComponentFixture<CancelledRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelledRewardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelledRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
