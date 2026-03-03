import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart/cart.service';
import { AchatService } from '../../../core/services/achat/achat.service';
import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartService = inject(CartService) as CartService;
  private router = inject(Router);
  private achatService = inject(AchatService);
  private api = inject(ApiService);

  cartItems: CartItem[] = [];
  subtotal = 0;
  total = 0;
  walletSolde = 0;
  isLoadingWallet = true;
  isProcessing = false;

  deliveryOptions = [
    { id: 'standard', name: 'Livraison Standard (3-5 jours)', cost: 0 },
    { id: 'express', name: 'Livraison Express (1-2 jours)', cost: 0 },
    { id: 'pickup', name: 'Retrait en boutique', cost: 0 }
  ];
  selectedDeliveryId = 'pickup';
  deliveryCost = 0;

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotals();
    this.loadWallet();
  }

  loadWallet() {
    this.api.get<any>('/wallet', true).subscribe({
      next: (res) => {
        this.walletSolde = res.data?.solde_actuel || 0;
        this.isLoadingWallet = false;
      },
      error: () => this.isLoadingWallet = false
    });
  }

  onDeliveryChange() {
    const selected = this.deliveryOptions.find(o => o.id === this.selectedDeliveryId);
    if (selected) {
      this.deliveryCost = selected.cost;
      this.calculateTotals();
    }
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((acc: number, item: CartItem) => acc + (item.prixActuel * item.quantity), 0);
    this.total = this.subtotal + this.deliveryCost;
  }

  validerAchat() {
    if (this.total > this.walletSolde) {
      alert('Solde insuffisant ! Veuillez recharger vos jetons.');
      return;
    }

    this.isProcessing = true;
    const items = this.cartItems.map(item => ({
      produitId: item.id,
      quantite: item.quantity
    }));

    this.achatService.acheter(items).subscribe({
      next: () => {
        // Clear cart after successful backend purchase
        this.cartItems.forEach((item: CartItem) => this.cartService.removeFromCart(item.id));
        alert('Achat validé avec succès !');
        this.router.navigate(['/profile']);
        this.isProcessing = false;
      },
      error: (err) => {
        alert(err.error?.message || 'Une erreur est survenue lors de l\'achat.');
        this.isProcessing = false;
      }
    });
  }

  annulerAchat() {
    this.router.navigate(['/cart']);
  }
}

