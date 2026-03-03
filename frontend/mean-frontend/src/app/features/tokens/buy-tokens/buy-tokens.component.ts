import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JetonService, Jeton } from '../../../core/services/jeton/jeton.service';
import { ModePaiementService, ModePaiement } from '../../../core/services/mode-paiement/mode-paiement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-tokens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buy-tokens.component.html',
  styleUrls: ['./buy-tokens.component.css']
})
export class BuyTokensComponent implements OnInit {
  private jetonService = inject(JetonService);
  private modePaiementService = inject(ModePaiementService);
  private router = inject(Router);

  jetons: Jeton[] = [];
  modesPaiement: ModePaiement[] = [];

  selectedJeton: Jeton | null = null;
  selectedModePaiement: string = '';
  referenceVirement: string = '';
  note: string = '';
  nombre: number = 1;

  isLoading = true;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.jetonService.getJetonsDisponible().subscribe({
      next: (res: any) => {
        this.jetons = res; // Backend returns direct array for /all
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });

    this.modePaiementService.getAll().subscribe({
      next: (res: any) => {
        this.modesPaiement = res.data || res;
      }
    });
  }

  selectJeton(jeton: Jeton) {
    this.selectedJeton = jeton;
  }

  onSubmit() {
    if (!this.selectedJeton || !this.selectedModePaiement || !this.referenceVirement) {
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const data = {
      items: [{
        jetonId: this.selectedJeton._id,
        nombre: this.nombre
      }],
      modePaiementId: this.selectedModePaiement,
      referenceVirement: this.referenceVirement,
      note: this.note
    };

    this.jetonService.acheterJeton(data).subscribe({
      next: () => {
        this.successMessage = 'Votre demande a été enregistrée et sera traitée sous peu.';
        this.isSubmitting = false;
        setTimeout(() => this.router.navigate(['/profile']), 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Une erreur est survenue.';
        this.isSubmitting = false;
      }
    });
  }
}
