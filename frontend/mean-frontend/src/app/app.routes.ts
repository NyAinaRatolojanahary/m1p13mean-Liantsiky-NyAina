import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './core/layout/client/client-layout/client-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./core/layout/client/home-component/home-component.component')
            .then(m => m.HomeComponentComponent)
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./features/products/product-detail/product-detail.component')
            .then(m => m.ProductDetailComponent)
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/category/list-category/list-category.component')
            .then(m => m.ListCategoryComponent)
      },
      {
        path: 'categories/:categoryId',
        loadComponent: () =>
          import('./features/category/list-category/list-category.component')
            .then(m => m.ListCategoryComponent)
      },
      {
        path: 'shops',
        loadComponent: () =>
          import('./features/shop/list-shop/list-shop.component')
            .then(m => m.ListShopComponent)
      },
      {
        path: 'shops/:shopId',
        loadComponent: () =>
          import('./features/shop/list-shop/list-shop.component')
            .then(m => m.ListShopComponent)
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart-list/cart-list.component')
            .then(m => m.CartListComponent)
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/profile/profile/profile.component')
            .then(m => m.ProfileComponent)
      },
      {
        path: 'checkout',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/checkout/checkout/checkout.component')
            .then(m => m.CheckoutComponent)
      },
      {
        path: 'buy-tokens',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/tokens/buy-tokens/buy-tokens.component')
            .then(m => m.BuyTokensComponent)
      }
    ]
  }
];
