import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRewardComponent } from './create-reward.component';

describe('CreateRewardComponent', () => {
  let component: CreateRewardComponent;
  let fixture: ComponentFixture<CreateRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
