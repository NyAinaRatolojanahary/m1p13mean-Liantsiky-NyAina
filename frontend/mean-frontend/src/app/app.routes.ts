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
            .then(m => m.EtageFormComponent)
        }

    ]
  }
];
