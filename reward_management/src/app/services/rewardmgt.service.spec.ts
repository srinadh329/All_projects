import { TestBed } from '@angular/core/testing';

import { RewardmgtService } from './rewardmgt.service';

describe('RewardmgtService', () => {
  let service: RewardmgtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RewardmgtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
