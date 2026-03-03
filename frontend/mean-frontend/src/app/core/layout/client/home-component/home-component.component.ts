import { Component } from '@angular/core';
import { CarrouselProductComponent } from "../../../../features/products/carrousel-product/carrousel-product.component";
import { CategoryCarouselComponent } from "../../../../features/category/category-carousel/category-carousel.component";
import { ShopCarouselComponent } from "../../../../features/shop/shop-carousel/shop-carousel.component";

@Component({
  selector: 'app-home-component',
  imports: [CarrouselProductComponent, CategoryCarouselComponent, ShopCarouselComponent],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
