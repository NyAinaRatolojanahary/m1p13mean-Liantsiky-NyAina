import {Component,CUSTOM_ELEMENTS_SCHEMA,Input,OnInit,AfterViewInit,Inject,PLATFORM_ID,inject} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProduitService, Produit } from '../../../core/services/produit/produit.service';

declare var $: any;

@Component({
  selector: 'app-carrousel-product',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './carrousel-product.component.html',
  styleUrls: ['./carrousel-product.component.css']
})
export class CarrouselProductComponent implements OnInit, AfterViewInit {

  @Input() title: string = '';
  @Input() type: 'latest' | 'bestSeller' | 'promo' = 'latest';

  private produitService = inject(ProduitService);

  products: Produit[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initCarousel(), 100);
    }
  }

  private loadProducts() {
    if (this.type === 'latest') {
      this.produitService.getRandom().subscribe({
        next: (response) => {
          if (response.success) {
            this.products = response.data;

            if (isPlatformBrowser(this.platformId)) {
              setTimeout(() => this.initCarousel(), 100);
            }
          }
        },
        error: (err) => {
          console.error('Erreur chargement produits', err);
        }
      });
    }
  }

  private initCarousel() {
    const slider = $('.products__slider');

    if (slider.length && !slider.hasClass('owl-loaded')) {
      slider.owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: false,
        nav: true,
        navText: [
          "<span class='fa fa-angle-left'></span>",
          "<span class='fa fa-angle-right'></span>"
        ],
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
          0: { items: 1 },
          480: { items: 2 },
          768: { items: 3 },
          992: { items: 4 }
        }
      });
    } else if (slider.hasClass('owl-loaded')) {
      slider.trigger('refresh.owl.carousel');
    }
  }
}