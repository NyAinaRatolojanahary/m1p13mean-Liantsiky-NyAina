import { SidebarItem } from
'../../shared/components/sidebar/sidebar.model';

export const ADMIN_MENU: SidebarItem[] = [
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
      { label: 'Liste', route: '/admin/box/list' },
      { label: 'Allouer', route: '/admin/box/contrat/create' }
    ]
  },
  {
    label: 'Boutique',
    icon: 'shopping-bag',
    children: [
      { label: 'Creer', route: '/admin/boutique/create' },
      { label: 'Liste', route: '/admin/boutique/list' }
    ]
  },
  {
    label: 'Categorie Produit',
    icon: 'grid',
    children: [
      { label: 'Creer', route: '/admin/categorie-produit/create' },
      { label: 'Liste', route: '/admin/categorie-produit/list' }
    ]
  },
  {
    label: 'Jeton',
    icon: 'dollar-sign',
    children: [
      { label: 'Creer', route: '/admin/jeton/create' },
      { label: 'Liste', route: '/admin/jeton/list' },
      { label: 'Traiter demandes', route: '/admin/demande-jeton/list' },
    ]
  },
  {
    label: 'Mode paiement',
    icon: 'credit-card',
    children: [
      { label: 'Creer', route: '/admin/mode-paiement/create' },
      { label: 'Liste', route: '/admin/mode-paiement/list' }
    ]
  },
  {
    label: 'Utilisateur',
    icon: 'users',
    children: [
      { label: 'Creer', route: '/admin/userShop/create' },
      { label: 'Liste', route: '/admin/user/list' }
    ]
  },
  

];