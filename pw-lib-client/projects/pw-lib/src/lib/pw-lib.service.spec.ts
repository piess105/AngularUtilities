import { TestBed } from '@angular/core/testing';

import { PwLibService } from './pw-lib.service';

describe('PwLibService', () => {
  let service: PwLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
