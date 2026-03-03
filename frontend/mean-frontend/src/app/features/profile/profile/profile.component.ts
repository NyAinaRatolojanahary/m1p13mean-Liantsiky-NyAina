import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api/api.service';
import { AuthService, User } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private api = inject(ApiService);
  public authService = inject(AuthService);

  user: User | null = null;
  isLoading = true;
  errorMessage = '';

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
}