import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should calculate quantity and totals correctly', () => {
    service.addToCart({ id: 1, title: 'Product', price: 25 });

    expect(service.getCartItems()[0].quantity).toBe(1);
    expect(service.getTotalAmount()).toBe(25);

    service.increaseQuantity(1);
    expect(service.getCartItems()[0].quantity).toBe(2);
    expect(service.getTotalAmount()).toBe(50);

    service.decreaseQuantity(1);
    service.decreaseQuantity(1);
    expect(service.getCartItems()[0].quantity).toBe(1);
  });
});
