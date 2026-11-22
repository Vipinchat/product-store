
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private storageKey = 'wishlist';

  private wishlistItems: any[] = this.loadWishlist();

  // Wishlist products observable
  private wishlistSubject =
    new BehaviorSubject<any[]>([...this.wishlistItems]);

  wishlist$ = this.wishlistSubject.asObservable();

  // Wishlist count observable
  private wishlistCountSubject =
    new BehaviorSubject<number>(this.wishlistItems.length);

  wishlistCount$ = this.wishlistCountSubject.asObservable();

  constructor() {}

  // Load products from localStorage
  private loadWishlist(): any[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      const items = data ? JSON.parse(data) : [];
      return Array.isArray(items)
        ? items.map(item => ({
            ...item,
            quantity: this.normalizeQuantity(item.quantity)
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

  // Update products, count and localStorage
  private updateWishlist(): void {
    this.wishlistSubject.next([...this.wishlistItems]);

    this.wishlistCountSubject.next(this.wishlistItems.length);

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.wishlistItems)
    );
  }

  addToWishlist(product: any): void {

    const alreadyExists = this.wishlistItems.some(
      item => item.id === product.id
    );

    if (!alreadyExists) {
      this.wishlistItems = [
        ...this.wishlistItems,
        {
          ...product,
          quantity: this.normalizeQuantity(product.quantity)
        }
      ];
      this.updateWishlist();
    }
  }

  removeFromWishlist(productId: number): void {

    this.wishlistItems = this.wishlistItems.filter(
      item => item.id !== productId
    );

    this.updateWishlist();
  }

  isInWishlist(productId: number): boolean {

    return this.wishlistItems.some(
      item => item.id === productId
    );
  }

  getWishlistItems(): any[] {
    return [...this.wishlistItems];
  }

  clearWishlist(): void {
    this.wishlistItems = [];
    this.updateWishlist();
  }



  increaseQuantity(productId : number): void {
    this.wishlistItems = this.wishlistItems.map(item =>
      item.id === productId
        ? { ...item, quantity: this.normalizeQuantity(item.quantity) + 1 }
        : item
    );
    this.updateWishlist();
  }

  decreaseQuantity(productId : number): void {
    this.wishlistItems = this.wishlistItems.map(item =>
      item.id === productId
        ? { ...item, quantity: Math.max(1, this.normalizeQuantity(item.quantity) - 1) }
        : item
    );
    this.updateWishlist();
  }
}
