import { TestBed } from '@angular/core/testing';

import { DwollaServiceService } from './dwolla-service.service';

describe('DwollaServiceService', () => {
  let service: DwollaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DwollaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
