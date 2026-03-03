import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProduitService, Produit } from '../../../core/services/produit/produit.service';
import { CategorieService, Categorie } from '../../../core/services/categorie/categorie.service';
import { ProductCardComponent } from '../../products/product-card/product-card.component';

@Component({
  selector: 'app-list-category',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.css'
})
export class ListCategoryComponent implements OnInit {
  private produitService = inject(ProduitService);
  private categorieService = inject(CategorieService);
  private route = inject(ActivatedRoute);

  products: Produit[] = [];
  categories: Categorie[] = [];
  categoryTitle = 'Toutes les catégories';
  isLoading = true;

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('categoryId');
      this.isLoading = true;
      if (categoryId) {
        // Get category name
        this.categorieService.getById(categoryId).subscribe({
          next: (res) => { this.categoryTitle = res.data.nom; }
        });

        // Get products for this category
        this.produitService.getByCategorie(categoryId).subscribe({
          next: (res) => {
            this.products = res.data;
            this.isLoading = false;
          },
          error: () => { this.isLoading = false; }
        });
      } else {
        this.categoryTitle = 'Toutes les categories';
        this.categorieService.getAll().subscribe({
          next: (res) => {
            this.categories = res.data;
            this.isLoading = false;
          },
          error: () => { this.isLoading = false; }
        });
      }
    });
  }
}
