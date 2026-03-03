import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchatService, Achat } from '../../../core/services/achat/achat.service';

@Component({
  selector: 'app-profile-order-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="history-container">
      <h3>Mes Achats</h3>
      
      <div *ngIf="isLoading" class="loading">Chargement...</div>
      <div *ngIf="!isLoading && orders.length === 0" class="empty">Aucun achat effectué.</div>

      <div class="orders-list">
        <div *ngFor="let order of orders" class="order-card">
          <div class="order-header" (click)="toggleDetails(order._id)">
            <div class="order-main-info">
              <span class="date">{{ order.dateAchat | date:'medium' }}</span>
              <span class="total">{{ order.prixTotal }} Jetons</span>
            </div>
            <i class="fa" [ngClass]="expandedId === order._id ? 'fa-chevron-up' : 'fa-chevron-down'"></i>
          </div>

          <div *ngIf="expandedId === order._id" class="order-details">
            <div *ngIf="detailsLoading" class="loading-small">Chargement des détails...</div>
            <table *ngIf="!detailsLoading" class="details-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Prix</th>
                  <th>Qté</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let item of currentDetails">
                  <td>{{ item.produitId?.nom }}</td>
                  <td>{{ item.prixUnitaire }}</td>
                  <td>{{ item.quantite }}</td>
                  <td>{{ item.total }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .order-card { border: 1px solid #dee2e6; border-radius: 8px; margin-bottom: 15px; overflow: hidden; }
    .order-header { 
      padding: 15px; background: #f8f9fa; display: flex; justify-content: space-between; 
      align-items: center; cursor: pointer; transition: background 0.2s;
    }
    .order-header:hover { background: #e9ecef; }
    .order-main-info .date { font-weight: bold; margin-right: 20px; }
    .order-main-info .total { color: #28a745; font-weight: bold; }
    .order-details { padding: 15px; border-top: 1px solid #dee2e6; }
    .details-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    .details-table th, .details-table td { padding: 8px; text-align: left; border-bottom: 1px solid #eee; }
  `]
})
export class ProfileOrderHistoryComponent implements OnInit {
  private achatService = inject(AchatService);

  orders: Achat[] = [];
  isLoading = true;
  expandedId: string | null = null;
  currentDetails: any[] = [];
  detailsLoading = false;

  ngOnInit() {
    this.achatService.getAll().subscribe({
      next: (res: any) => {
        this.orders = res.data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  toggleDetails(id: string) {
    if (this.expandedId === id) {
      this.expandedId = null;
    } else {
      this.expandedId = id;
      this.loadDetails(id);
    }
  }

  loadDetails(id: string) {
    this.detailsLoading = true;
    this.achatService.getDetails(id).subscribe({
      next: (res: any) => {
        this.currentDetails = res.data;
        this.detailsLoading = false;
      },
      error: () => this.detailsLoading = false
    });
  }
}
