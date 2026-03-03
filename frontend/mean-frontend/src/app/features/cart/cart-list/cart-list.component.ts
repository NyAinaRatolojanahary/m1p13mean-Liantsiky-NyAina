import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart.service';
import { AchatService } from '../../../core/services/achat/achat.service';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {
  cartService = inject(CartService);
  achatService = inject(AchatService);
  router = inject(Router);

  decreaseQuantity(itemId: string, currentQuantity: number) {
    if (currentQuantity > 1) {
      this.cartService.updateQuantity(itemId, currentQuantity - 1);
    }
  }

  increaseQuantity(itemId: string, currentQuantity: number) {
    this.cartService.updateQuantity(itemId, currentQuantity + 1);
  }

  updateQuantity(itemId: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const value = parseInt(input.value, 10);
    if (!isNaN(value) && value > 0) {
      this.cartService.updateQuantity(itemId, value);
    } else {
      input.value = '1';
      this.cartService.updateQuantity(itemId, 1);
    }
  }

  removeItem(itemId: string) {
    this.cartService.removeFromCart(itemId);
  }

  checkout() {

    const cartItems = this.cartService.getCartItems();

    if (!cartItems || cartItems.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const items = cartItems.map(item => ({
      produitId: item.id,
      quantite: item.quantity
    }));

    console.log(items);

    this.achatService.acheter(items).subscribe({
      next: (response) => {

        if (response.success) {
          console.log('Achat réussi', response.data);

          this.cartService.clearCart();
          this.router.navigate(['/checkout-success']);
        }

      },
      error: (err) => {
        console.error(err);
        alert(err?.error?.message || 'Erreur lors du paiement');
      }
    });
  }
}
