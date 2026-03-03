import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
  host: { 'class': 'd-block' }
})
export class ProductCardComponent {

  @Input() id!: any;
  @Input() name!: string;
  @Input() category!: string;
  @Input() prixActuel!: number;
  @Input() discount!: number;
  @Input() image!: string;

  get oldPrice(): number {
    if (this.discount > 0) {
      return this.prixActuel / (1 - this.discount / 100);
    }
    return 0;
  }
}