import { Component } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private cartService: CartService,
    public wishlist : WishlistService
  ){
   
  }

  cartCount$ = this.cartService.cartCount$;
  count = this.wishlist.getWishlistItems;
wishlistItems$ = this.wishlist.wishlist$;
}
