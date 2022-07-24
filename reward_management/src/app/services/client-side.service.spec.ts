import { TestBed } from '@angular/core/testing';

import { ClientSideService } from './client-side.service';

describe('ClientSideService', () => {
  let service: ClientSideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientSideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
