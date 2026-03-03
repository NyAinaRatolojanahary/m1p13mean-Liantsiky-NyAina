import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JetonService, AchatJeton } from '../../../core/services/jeton/jeton.service';
import { ApiService } from '../../../core/services/api/api.service';

@Component({
  selector: 'app-profile-wallet',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="wallet-container">
      <h3>Mon Portefeuille</h3>
      
      <div class="solde-card">
        <i class="fa fa-coins"></i>
        <div class="solde-info">
          <span class="label">Solde actuel</span>
          <span class="amount">{{ solde }} Jetons</span>
        </div>
      </div>

      <div class="history-section">
        <h4>Historique des jetons</h4>
        <div *ngIf="isLoading" class="loading">Chargement...</div>
        <div *ngIf="!isLoading && history.length === 0" class="empty">Aucun historique.</div>
        
        <table *ngIf="!isLoading && history.length > 0" class="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Référence</th>
              <th>Montant</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of history">
              <td>{{ item.dateDemande | date:'short' }}</td>
              <td>{{ item.referenceVirement }}</td>
              <td>{{ item.montantTotal }} €</td>
              <td>
                <span class="status-badge" [ngClass]="item.status?.code === 20 ? 'status-done' : 'status-pending'">
                  {{ item.status?.nom }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .solde-card {
      display: flex;
      align-items: center;
      background: #f8f9fa;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
      border-left: 5px solid #ffc107;
    }
    .solde-card i { font-size: 2.5rem; color: #ffc107; margin-right: 20px; }
    .solde-info .label { display: block; color: #6c757d; font-size: 0.9rem; }
    .solde-info .amount { font-size: 1.8rem; font-weight: bold; }
    .status-badge { padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; }
    .status-pending { background: #fff3cd; color: #856404; }
    .status-done { background: #d4edda; color: #155724; }
    .table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    .table th, .table td { padding: 12px; border-bottom: 1px solid #dee2e6; text-align: left; }
  `]
})
export class ProfileWalletComponent implements OnInit {
  private jetonService = inject(JetonService);
  private api = inject(ApiService);

  solde = 0;
  history: AchatJeton[] = [];
  isLoading = true;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.get<any>('/wallet', true).subscribe((res: any) => {
      this.solde = res.data?.solde_actuel || 0;
    });

    this.jetonService.getHistoriqueAchats().subscribe({
      next: (res: any) => {
        this.history = res.data;
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }
}
