import { TestBed, inject } from '@angular/core/testing';

import { EncrDecrServiceService } from './encr-decr-service.service';

describe('EncrDecrServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncrDecrServiceService]
    });
  });

  it('should be created', inject([EncrDecrServiceService], (service: EncrDecrServiceService) => {
    expect(service).toBeTruthy();
  }));
});
