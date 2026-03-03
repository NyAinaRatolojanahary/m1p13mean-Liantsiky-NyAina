import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: string;
  name: string;
  prixActuel: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  public cartItems$ = computed(() => this.cartItems());
  public cartTotal$ = computed(() => this.cartItems().reduce((total, item) => total + (item.prixActuel * item.quantity), 0));
  public cartCount$ = computed(() => this.cartItems().reduce((count, item) => count + item.quantity, 0));

  constructor() {
    this.loadCart();
  }

  getCartItems(): CartItem[] {
    return this.cartItems();
  }

  private loadCart() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        try {
          this.cartItems.set(JSON.parse(storedCart));
        } catch (e) {
          console.error('Error parsing cart from local storage', e);
        }
      }
    }
  }

  private saveCart() {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cart', JSON.stringify(this.cartItems()));
    }
  }

  getCart(): CartItem[] {
    return this.cartItems();
  }

  addToCart(item: Omit<CartItem, 'quantity'>, quantity: number = 1) {
    const currentItems = this.cartItems();
    const existingIndex = currentItems.findIndex(i => i.id === item.id);

    if (existingIndex > -1) {
      currentItems[existingIndex].quantity += quantity;
      this.cartItems.set([...currentItems]);
    } else {
      this.cartItems.set([...currentItems, { ...item, quantity }]);
    }
    this.saveCart();
  }

  removeFromCart(itemId: string) {
    this.cartItems.set(this.cartItems().filter(item => item.id !== itemId));
    this.saveCart();
  }

  updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(itemId);
      return;
    }
    const currentItems = this.cartItems();
    const itemIndex = currentItems.findIndex(i => i.id === itemId);
    if (itemIndex > -1) {
      currentItems[itemIndex].quantity = quantity;
      this.cartItems.set([...currentItems]);
      this.saveCart();
    }
  }

  clearCart() {
    this.cartItems.set([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
  }

}
