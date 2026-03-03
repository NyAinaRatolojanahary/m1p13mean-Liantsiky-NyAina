import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { ProduitService, Produit } from '../../../core/services/produit/produit.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  private cartService = inject(CartService);
  private produitService = inject(ProduitService);
  private route = inject(ActivatedRoute);

  product: Produit | null = null;
  quantity = 1;
  isLoading = true;
  errorMessage = '';

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isLoading = true;
        this.produitService.getById(id).subscribe({
          next: (res) => {
            this.product = res.data;
            this.isLoading = false;
          },
          error: () => {
            this.errorMessage = 'Produit introuvable.';
            this.isLoading = false;
          }
        });
      }
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart({
        id: this.product._id,
        name: this.product.nom,
        prixActuel: this.product.prixActuel,
        image: this.product.images || ''
      }, this.quantity);

      alert('Produit ajouté au panier !');
    }
  }
}
