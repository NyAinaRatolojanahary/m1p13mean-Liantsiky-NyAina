import { TestBed } from '@angular/core/testing';

import { ShopUserService } from './shop-user.service';

describe('ShopUserService', () => {
  let service: ShopUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
