import { TestBed } from '@angular/core/testing';

import { OrdercartService } from './ordercart.service';

describe('OrdercartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdercartService = TestBed.get(OrdercartService);
    expect(service).toBeTruthy();
  });
});
