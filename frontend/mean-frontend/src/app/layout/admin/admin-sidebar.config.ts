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
      { label: 'Liste', route: '/admin/etage/list' }
    ]
  },

 {
    label: 'Box',
    icon: 'package',
    children: [
      { label: 'Creer', route: '/admin/box/create' },
      { label: 'Liste', route: '/admin/box/list' }
    ]
  },

];