import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../core/services/product.service';
import { AlertService } from '../../core/services/alert.service';
import { CartService } from '../../core/services/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  filteredProducts: Product[] = [];

  selectedCategory: string = 'all';


  constructor(
    private productService: ProductService,
    private alert: AlertService,
    private cartService: CartService,
    public wishlistService: WishlistService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }


  ngOnInit(): void {

    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (error) => {
        console.log(error);
        this.alert.warning('Product Loading Failed', 'Unable to load products. Please try again later.');
      }
    });
  }


  filterProducts(category: string): void {

    this.selectedCategory = category;


    if (category === 'all') {

      this.filteredProducts = this.products;

    } else {

      this.filteredProducts = this.products.filter(
        product => product.category === category
      );

    }

  }
  selectedProduct: Product | null = null;


  openProduct(product: Product) {
    this.selectedProduct = product;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.alert.success('Product Added', 'The product has been added to your cart.');
  }



  toggleWishlist(product: any) {
    if (this.wishlistService.isInWishlist(product.id)) {
      this.wishlistService.removeFromWishlist(product.id);
      // this.alert.info('Removed from Wishlist','The product has been removed from your wishlist.');
      this.messageService.add({
        severity: 'info',
        summary: 'Remove from Wishlist',
        detail: 'The product has been removed from your wishlist.',
        life: 2000
      });
    } else {
      this.wishlistService.addToWishlist(product);
      // this.alert.success('Added to Wishlist','The product has been added to your wishlist.');
      this.messageService.add({
        severity: 'success',
        summary: 'Added to Wishlist',
        detail: 'The product has been added to your wishlist.',
        life: 2000
      });
      this.alert.success('Added to Wishlist', 'The product has been added to your wishlist.');

    }
  }


  
private wishlistClickTimer: any;

onWishlistSingleClick(product: any): void {
  // Wait to check whether this is a double-click
  clearTimeout(this.wishlistClickTimer);

  this.wishlistClickTimer = setTimeout(() => {
    // Single click: add only if not already in wishlist
    if (!this.wishlistService.isInWishlist(product.id)) {
      this.wishlistService.addToWishlist(product);

      this.messageService.add({
        severity: 'success',
        summary: 'Added to Wishlist',
        detail: 'The product has been added to your wishlist.',
        life: 2000
      });
    }
  }, 250);
}

onWishlistDoubleClick(product: any): void {
  // Cancel the pending single-click action
  clearTimeout(this.wishlistClickTimer);

  // Double click: remove if already in wishlist
  if (this.wishlistService.isInWishlist(product.id)) {
    this.wishlistService.removeFromWishlist(product.id);

    this.messageService.add({
      severity: 'info',
      summary: 'Removed from Wishlist',
      detail: 'The product has been removed from your wishlist.',
      life: 2000
    });
  }
}

}