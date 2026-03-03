import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.css'
})
export class LoginModalComponent {
  @Output() close = new EventEmitter<void>();
  private authService = inject(AuthService);

  email = '';
  password = '';
  nom = '';
  prenom = '';
  dtn: string = '';
  errorMessage = '';
  isLoading = false;
  isLoginMode = true;

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
  }

  onSubmit() {
    if (this.isLoginMode) {
      this.login();
    } else {
      this.register();
    }
  }

  private login() {
    if (!this.email || !this.password) return;
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.closeModal();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || 'Identifiants incorrects. Veuillez réessayer.';
      }
    });
  }

  private register() {
    if (!this.email || !this.password || !this.nom || !this.prenom) return;
    this.isLoading = true;
    this.errorMessage = '';

    const userData = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
      dtn: this.dtn
    };

    this.authService.register(userData).subscribe({
      next: () => {
        // After registration, try to login automatically
        this.login();
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error?.message || "Erreur lors de l'inscription. Veuillez réessayer.";
      }
    });
  }

  closeModal() {
    this.close.emit();
  }
}
