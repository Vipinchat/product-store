import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component';
import { ProductDetailsComponent } from './features/product-details/product-details.component';
import { ContactComponent } from './features/contact/contact.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AddToCartComponent } from './features/add-to-cart/add-to-cart.component';
import { AddToWishListComponent } from './features/add-to-wish-list/add-to-wish-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'home',
    pathMatch:'full'
  },
  {
    path: 'home',
    component:HomeComponent
  },
  {
    path: 'products',
    component:ProductsComponent
  },
  {
    path: 'product/:id',
    component:ProductDetailsComponent
  },
  {
    path:'contact',
    component:ContactComponent
  },
  {
    path:'cart',
    component:AddToCartComponent
  },
  {
    path:'wishlist',
    component:AddToWishListComponent
  },
  {
    path:'login',
    component:LoginComponent

  },
  {
    path:'**',
    redirectTo:'home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
