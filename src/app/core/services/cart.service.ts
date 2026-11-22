
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private storageKey = 'cartItems';

  // Load cart data from localStorage
  private cartItems: any[] = this.loadCart();

  private cartCount = new BehaviorSubject<number>(
    this.calculateCartCount()
  );

  cartCount$ = this.cartCount.asObservable();

  constructor() {}

  // Get saved cart data
  private loadCart(): any[] {
    try {
      const savedCart = localStorage.getItem(this.storageKey);
      const items = savedCart ? JSON.parse(savedCart) : [];
      return Array.isArray(items)
        ? items.map(item => ({
            ...item,
            quantity: this.normalizeQuantity(item.quantity),
            price: Number(item.price) || 0
          }))
        : [];
    } catch {
      return [];
    }
  }

  private normalizeQuantity(quantity: unknown): number {
    const value = Number(quantity);
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 1;
  }

  // Save cart data and update badge count
  private updateCartCount(): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.cartItems)
    );

    this.cartCount.next(this.calculateCartCount());
  }

  // Calculate total quantity of all products
  private calculateCartCount(): number {
    return this.cartItems.reduce(
      (total, item) => total + this.normalizeQuantity(item.quantity),
      0
    );
  }

  // Add product to cart
  addToCart(product: any): void {

    const existingProduct = this.cartItems.find(
      item => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity = this.normalizeQuantity(existingProduct.quantity) + 1;
    } else {
      this.cartItems.push({
        ...product,
        price: Number(product.price) || 0,
        quantity: 1
      });
    }

    this.updateCartCount();
  }

  // Get all cart products
  getCartItems(): any[] {
    return this.cartItems.map(item => ({ ...item }));
  }

  // Remove product from cart
  removeFromCart(productId: number): void {

    this.cartItems = this.cartItems.filter(
      item => item.id !== productId
    );

    this.updateCartCount();
  }

  // Increase quantity
  increaseQuantity(productId: number): void {
    this.cartItems = this.cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: this.normalizeQuantity(item.quantity) + 1 }
        : item
    );
    this.updateCartCount();
  }

  // Decrease quantity
  decreaseQuantity(productId: number): void {
    this.cartItems = this.cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, this.normalizeQuantity(item.quantity) - 1) }
        : item
    );
    this.updateCartCount();
  }

  // Calculate total amount
  getTotalAmount(): number {
    return this.cartItems.reduce(
      (total, item) =>
        total + ((Number(item.price) || 0) * this.normalizeQuantity(item.quantity)),
      0
    );
  }

  // Clear entire cart
  clearCart(): void {
    this.cartItems = [];
    this.updateCartCount();
  }
}
