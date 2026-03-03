import { Component, inject, PLATFORM_ID, Inject, AfterViewInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../../../core/services/cart/cart.service';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

declare var $: any;

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, LoginModalComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  cartService = inject(CartService);
  authService = inject(AuthService);
  private platformId = inject(PLATFORM_ID);

  showLoginModal = false;
  showDropdown = false;
  isMobileMenuOpen = false;

  openLoginModal(event: Event) {
    event.preventDefault();
    this.showLoginModal = true;
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      document.body.classList.add('over_hid');
    } else {
      document.body.classList.remove('over_hid');
    }
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.showDropdown = false;
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        // Init slicknav for responsive mobile menu
        if ($.fn.slicknav) {
          $(".mobile-menu").slicknav({
            prependTo: '#mobile-menu-wrap',
            allowParentLinks: true
          });
        }
      }, 100);
    }
  }
}

