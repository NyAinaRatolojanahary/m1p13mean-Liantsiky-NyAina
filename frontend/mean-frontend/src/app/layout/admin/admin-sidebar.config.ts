import { SidebarItem } from
'../../shared/components/sidebar/sidebar.model';

export const ADMIN_MENU: SidebarItem[] = [

  {
    label: 'Dashboard',
    icon: 'airplay',
    route: '/admin/dashboard'
  },

  {
    label: 'Etage',
    icon: 'package',
    children: [
      { label: 'Creer', route: '/admin/etage/create' },
      { label: 'Create', route: '/admin/etage-form/create' }
    ]
  },

  {
    label: 'Customers',
    icon: 'users',
    route: '/admin/customers'
  }

];