import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../core/services/product.service';
import { AlertService } from '../../core/services/alert.service';
import { CartService } from '../../core/services/cart.service';  
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {


  products: Product[] = [];

  constructor(
    private product: ProductService,
    private alert: AlertService,
    private cartService: CartService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.getFeaturedProducts();
    
  }

  getFeaturedProducts(): void{
    this.product.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error)=>{
        console.error('Product API Error:', error);
        this.alert.warning('Product Loading Failed','Please try again later.');
      }
    });
  }


  addToCart(product: Product){
    this.cartService.addToCart(product);
    this.alert.success('Product Added','The product has been added to your cart.');
  }


  navigateToProduct(){
    this.router.navigateByUrl('/products');
    
  }

}
