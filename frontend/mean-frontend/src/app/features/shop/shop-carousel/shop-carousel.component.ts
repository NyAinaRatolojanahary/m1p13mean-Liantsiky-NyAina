import { Component, AfterViewInit, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { BoutiqueService, Boutique } from '../../../core/services/boutique/boutique.service';

declare var $: any;

@Component({
  selector: 'app-shop-carousel',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './shop-carousel.component.html',
  styleUrl: './shop-carousel.component.css'
})
export class ShopCarouselComponent implements OnInit, AfterViewInit {
  private boutiqueService = inject(BoutiqueService);
  shops: Boutique[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.boutiqueService.getAll().subscribe({
      next: (res) => {
        this.shops = res.data;
        if (isPlatformBrowser(this.platformId)) {
          setTimeout(() => this.initCarousel(), 100);
        }
      }
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initCarousel(), 100);
    }
  }

  private initCarousel() {
    const slider = $('.init-shop-carousel');
    if (slider.length && !slider.hasClass('owl-loaded')) {
      slider.owlCarousel({
        loop: true,
        margin: 0,
        items: 4,
        dots: false,
        nav: true,
        navText: ["<span class='fa fa-angle-left'><span/>", "<span class='fa fa-angle-right'><span/>"],
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
