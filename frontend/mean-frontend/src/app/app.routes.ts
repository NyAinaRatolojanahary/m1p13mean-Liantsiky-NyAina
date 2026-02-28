import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin/admin-layout/admin-layout.component';

export const routes: Routes = [
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
        }

    ]
  }
];
