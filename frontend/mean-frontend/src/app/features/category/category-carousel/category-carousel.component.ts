import { Component, AfterViewInit, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { CategorieService, Categorie } from '../../../core/services/categorie/categorie.service';

declare var $: any;

@Component({
  selector: 'app-category-carousel',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './category-carousel.component.html',
  styleUrl: './category-carousel.component.css'
})
export class CategoryCarouselComponent implements OnInit, AfterViewInit {
  private categorieService = inject(CategorieService);
  categories: Categorie[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit() {
    this.categorieService.getAll().subscribe({
      next: (res) => {
        this.categories = res.data;
        // Re-init carousel after data loads
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
    const slider = $('.categories__slider');
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
