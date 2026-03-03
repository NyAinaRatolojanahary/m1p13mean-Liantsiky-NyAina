import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProduitService, Produit } from '../../../core/services/produit/produit.service';
import { BoutiqueService, Boutique } from '../../../core/services/boutique/boutique.service';

@Component({
  selector: 'app-list-shop',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-shop.component.html',
  styleUrl: './list-shop.component.css'
})
export class ListShopComponent implements OnInit {
  private produitService = inject(ProduitService);
  private boutiqueService = inject(BoutiqueService);
  private route = inject(ActivatedRoute);

  products: Produit[] = [];
  boutiques: Boutique[] = [];
  shopTitle = 'Toutes les boutiques';
  isLoading = true;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const shopId = params.get('shopId');
      this.isLoading = true;

      if (shopId) {
        // Get boutique name
        this.boutiqueService.getById(shopId).subscribe({
          next: (res) => { this.shopTitle = res.data.nom; }
        });
        // Get products for this shop
        this.produitService.getByBoutique(shopId).subscribe({
          next: (res) => {
            this.products = res.data;
            this.isLoading = false;
          },
          error: () => { this.isLoading = false; }
        });
      } else {
        // No shopId: list all boutiques
        this.shopTitle = 'Toutes les boutiques';
        this.boutiqueService.getAll().subscribe({
          next: (res) => {
            this.boutiques = res.data;
            this.isLoading = false;
          },
          error: () => { this.isLoading = false; }
        });
      }
    });
  }
}
