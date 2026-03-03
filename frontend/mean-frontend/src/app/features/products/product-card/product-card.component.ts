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
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent { 

  @Input() id!: any; 
  @Input() name!: string;
  @Input() category!: string;
  @Input() price!: number;
  @Input() oldPrice!: number;
  @Input() discount!: number;
  @Input() image!: string;
}