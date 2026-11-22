import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CartService } from '../../core/services/cart.service';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit {

  cartItems: any[] = [];

  totalAmount = 0;

  searchValue = '';

  shipping = 0;

  constructor(
    private cartService: CartService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private alertService: AlertService

  ) { }


  ngOnInit(): void {

    this.loadCart();

  }


  loadCart(): void {

    this.cartItems = this.cartService.getCartItems();

    this.calculateTotal();

  }


  increaseQuantity(productId: number): void {

    this.cartService.increaseQuantity(productId);

    this.loadCart();

  }


  decreaseQuantity(productId: number): void {

    this.cartService.decreaseQuantity(productId);

    this.loadCart();

  }

  getItemTotal(item: any): number {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return price * quantity;
  }



  removeItem(productId: number): void {

    this.alertService.confirm('Remove Product', 'Are you sure you want to remove this product?').then(
      (confirmed) => {
        if (confirmed) {
          this.cartService.removeFromCart(productId);
          this.loadCart();
          this.messageService.add({
            severity: 'success',
            summary: 'Removed',
            detail: 'Product removed from cart',
            life: 2000
          });
        }
      }
    );

  }


  calculateTotal(): void {

    this.totalAmount =
      this.cartService.getTotalAmount();

    this.shipping =
      this.totalAmount >= 100 ? 0 : 10;

  }


  get grandTotal(): number {

    return this.totalAmount + this.shipping;

  }


  clearCart(): void {

    this.alertService.confirm('Clear Cart', 'Are you sure you want to clear the cart?').then(
      (confirmed) => {
        if (confirmed) {
          this.cartService.clearCart();
          this.loadCart();

          this.messageService.add({
            severity: 'success',
            summary: 'Cart Cleared',
            detail: 'All products removed from cart',
            life: 1500
          });
        }
      }
    );
  }

}
