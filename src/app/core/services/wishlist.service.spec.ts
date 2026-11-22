import { TestBed } from '@angular/core/testing';

import { WishlistService } from './wishlist.service';

describe('WishlistService', () => {
  let service: WishlistService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize quantity and update totals through quantity actions', () => {
    service.addToWishlist({ id: 1, title: 'Product', price: 10 });

    expect(service.getWishlistItems()[0].quantity).toBe(1);

    service.increaseQuantity(1);
    expect(service.getWishlistItems()[0].quantity).toBe(2);
    expect(service.getWishlistItems()[0].price * service.getWishlistItems()[0].quantity).toBe(20);

    service.decreaseQuantity(1);
    expect(service.getWishlistItems()[0].quantity).toBe(1);

    service.decreaseQuantity(1);
    expect(service.getWishlistItems()[0].quantity).toBe(1);
  });
});
