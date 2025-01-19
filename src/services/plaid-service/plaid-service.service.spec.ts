import { TestBed } from '@angular/core/testing';

import { PlaidServiceService } from './plaid-service.service';

describe('PlaidServiceService', () => {
  let service: PlaidServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaidServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
