import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart/cart.service';

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

  cartItems: CartItem[] = [];
  subtotal = 0;
  total = 0;

  deliveryOptions = [
    { id: 'standard', name: 'Standard Delivery (3-5 days)', cost: 5.00 },
    { id: 'express', name: 'Express Delivery (1-2 days)', cost: 15.00 },
    { id: 'pickup', name: 'Store Pickup', cost: 0.00 }
  ];
  selectedDeliveryId = 'standard';
  deliveryCost = 5.00;

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.calculateTotals();
  }

  onDeliveryChange() {
    const selected = this.deliveryOptions.find((o: { id: string, name: string, cost: number }) => o.id === this.selectedDeliveryId);
    if (selected) {
      this.deliveryCost = selected.cost;
      this.calculateTotals();
    }
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((acc: number, item: CartItem) => acc + (item.price * item.quantity), 0);
    this.total = this.subtotal + this.deliveryCost;
  }

  validerAchat() {
    // In a real application, we would process payment and backend order creation here.
    // For this mock, we assume all items are purchased and we clear the cart.
    // If the requirement was to only purchase 'checked' items, we'd filter them out
    // and keep the unpurchased ones.

    // Simulating clearing the purchased items
    this.cartItems.forEach((item: CartItem) => this.cartService.removeFromCart(item.id));

    alert('Achat validé avec succès !');
    this.router.navigate(['/cart']);
  }

  annulerAchat() {
    // Navigate back to cart without making changes
    this.router.navigate(['/cart']);
  }
}

