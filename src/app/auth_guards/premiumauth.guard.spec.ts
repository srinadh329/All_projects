import { TestBed, async, inject } from '@angular/core/testing';

import { PremiumauthGuard } from './premiumauth.guard';

describe('PremiumauthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PremiumauthGuard]
    });
  });

  it('should ...', inject([PremiumauthGuard], (guard: PremiumauthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
