
import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { MessageService } from 'primeng/api';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-add-to-wish-list',
  templateUrl: './add-to-wish-list.component.html',
  styleUrl: './add-to-wish-list.component.css'
})

export class AddToWishListComponent implements OnInit {

  wishListItems: any[] = [];

  searchValue = '';

  constructor(
    private wishList: WishlistService,
    private messageService: MessageService,
    private alert: AlertService
  ) {}

  ngOnInit(): void {
    this.loadWishList();
  }

  // Load Wishlist Products
  loadWishList(): void {
    this.wishListItems = this.wishList.getWishlistItems();
  }

  // Increase Quantity
  increaseQuantity(productId: number): void {

    this.wishList.increaseQuantity(productId);

    this.loadWishList();
  }

  // Decrease Quantity
  decreaseQuantity(productId: number): void {

    this.wishList.decreaseQuantity(productId);

    this.loadWishList();
  }

  // Calculate Individual Product Total
  getItemTotal(item: any): number {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return price * quantity;
  }

  // Calculate Grand Total
  totalPrice(): number {
    return this.wishListItems.reduce(
      (total, item) => total + this.getItemTotal(item),
      0
    );
  }

  // Remove Individual Product
  removeItem(productId: number): void {

    this.alert.confirm(
      'Remove Product',
      'Are you sure you want to remove this product?'
    ).then((confirmed) => {

      if (confirmed) {

        this.wishList.removeFromWishlist(productId);

        this.loadWishList();

        this.messageService.add({
          severity: 'success',
          summary: 'Product Removed',
          detail: 'Product removed successfully',
          life: 1500
        });

      }

    });

  }

  // Clear Entire Wishlist
  clearWishList(): void {

    if (this.wishListItems.length === 0) {
      return;
    }

    this.alert.confirm(
      'Clear Wishlist',
      'Are you sure you want to clear the cart?'
    ).then((confirmed) => {

      if (confirmed) {

        [...this.wishListItems].forEach(item => {

          this.wishList.removeFromWishlist(item.id);

        });

        this.loadWishList();

        this.messageService.add({
          severity: 'success',
          summary: 'Cart Cleared',
          detail: 'All products removed from cart',
          life: 1500
        });

      }

    });

  }

}
