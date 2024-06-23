import { TestBed } from '@angular/core/testing';

import { DonhangGiohangService } from './donhang-giohang.service';

describe('DonhangGiohangService', () => {
  let service: DonhangGiohangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonhangGiohangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
