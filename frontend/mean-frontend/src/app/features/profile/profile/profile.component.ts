import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api/api.service';
import { AuthService, User } from '../../../core/services/auth/auth.service';
import { ProfileWalletComponent } from '../profile-wallet/profile-wallet.component';
import { ProfileOrderHistoryComponent } from '../profile-order-history/profile-order-history.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProfileWalletComponent, ProfileOrderHistoryComponent, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private api = inject(ApiService);
  public authService = inject(AuthService);

  user: User | null = null;
  isLoading = true;
  errorMessage = '';
  activeTab: 'profile' | 'wallet' | 'history' = 'profile';

  ngOnInit() {
    this.api.get<User>('/user/profile', true).subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Erreur lors du chargement du profil.';
        this.isLoading = false;
      }
    });
  }

  setTab(tab: 'profile' | 'wallet' | 'history') {
    this.activeTab = tab;
  }
}