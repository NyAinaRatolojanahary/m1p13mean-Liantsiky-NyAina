import { Routes } from '@angular/router';
import { ClientLayoutComponent } from './core/layout/client/client-layout/client-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { AdminLayoutComponent } from './layout/admin/admin-layout/admin-layout.component';

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
  },
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/log-in/pages/log-in/log-in.component')
      .then(m => m.LogInComponent)
  },
  {
        path: 'admin',
        component: AdminLayoutComponent,
        children: [

        {
            path: 'dashboard',
            loadComponent: () =>
            import('./features/admin/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
        },
        {
            path: 'etage/create',
            loadComponent: () =>
            import('./features/admin/etage/pages/etage-form/etage-form.component')
            .then(m => m.EtageFormComponent),
            runGuardsAndResolvers: 'always'

        },
        {
            path: 'etage/list',
            loadComponent: () =>
            import('./features/admin/etage/pages/etage-list/etage-list.component')
            .then(m => m.EtageListComponent),
            runGuardsAndResolvers: 'always'
        },
        {
            path: 'box/create',
            loadComponent: () =>
            import('./features/admin/box/pages/box-form/box-form.component')
            .then(m => m.BoxFormComponent),
              runGuardsAndResolvers: 'always'

        },
        {
            path: 'box/list',
            loadComponent: () =>
            import('./features/admin/box/pages/box-list/box-list.component')
            .then(m => m.BoxListComponent),
              runGuardsAndResolvers: 'always'

        },
        {
            path: 'box-loyer/:id',
            loadComponent: () =>
            import('./features/admin/box/pages/box-loyer-form/box-loyer-form.component')
            .then(m => m.BoxLoyerFormComponent),
              runGuardsAndResolvers: 'always'
        },
        {
            path: 'box/contrat/create',
            loadComponent: () =>
            import('./features/admin/box/pages/box-contrat-form/box-contrat-form.component')
            .then(m => m.BoxContratFormComponent),
              runGuardsAndResolvers: 'always'
        },
        {
            path: 'userShop/create',
            loadComponent: () =>
            import('./features/admin/shopUser/pages/shop-user-form/shop-user-form.component')
            .then(m => m.ShopUserFormComponent),
              runGuardsAndResolvers: 'always'
        },
        {
            path: 'user/list',
            loadComponent: () =>
            import('./features/admin/shopUser/pages/shop-user-list/shop-user-list.component')
            .then(m => m.ShopUserListComponent),
              runGuardsAndResolvers: 'always'
        },
        {
            path: 'boutique/create',
            loadComponent: () =>
            import('./features/admin/boutique/pages/boutique-form/boutique-form.component')
            .then(m => m.BoutiqueFormComponent),
              runGuardsAndResolvers: 'always'
        },
        {
            path: 'boutique/list',
            loadComponent: () =>
            import('./features/admin/boutique/pages/boutique-list/boutique-list.component')
            .then(m => m.BoutiqueListComponent),
              runGuardsAndResolvers: 'always'
        },
        {
            path: 'categorie-produit/create',
            loadComponent: () =>
            import('./features/admin/categorieProduit/pages/categorie-form/categorie-form.component')
            .then(m => m.CategorieFormComponent),
              runGuardsAndResolvers: 'always'
        },
        {
            path: 'categorie-produit/list',
            loadComponent: () =>
            import('./features/admin/categorieProduit/pages/categorie-list/categorie-list.component')
            .then(m => m.CategorieListComponent),
              runGuardsAndResolvers: 'always'
        },
        {
          path: 'mode-paiement/create',
            loadComponent: () =>
            import('./features/admin/modePaiement/pages/mode-form/mode-form.component')
            .then(m => m.ModeFormComponent),
              runGuardsAndResolvers: 'always'
        },
        {
          path: 'mode-paiement/list',
            loadComponent: () =>
            import('./features/admin/modePaiement/pages/mode-list/mode-list.component')
            .then(m => m.ModeListComponent),
              runGuardsAndResolvers: 'always'
        },
        {
          path: 'jeton/list',
            loadComponent: () =>
            import('./features/admin/jeton/pages/jeton-list/jeton-list.component')
            .then(m => m.JetonListComponent),
              runGuardsAndResolvers: 'always'
        },
        {
          path: 'jeton/create',
            loadComponent: () =>
            import('./features/admin/jeton/pages/jeton-form/jeton-form.component')
            .then(m => m.JetonFormComponent),
              runGuardsAndResolvers: 'always'
        },
        {
          path: 'demande-jeton/list',
            loadComponent: () =>
            import('./features/admin/jeton/pages/traitement-demande/traitement-demande.component')
            .then(m => m.TraitementDemandeComponent),
              runGuardsAndResolvers: 'always'
        }


    ]
  }
];
