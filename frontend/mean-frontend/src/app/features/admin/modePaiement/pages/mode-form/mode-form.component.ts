import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../../../shared/components/form/form-input/form-input.component';
import { ModePaiementService } from '../../services/mode-paiement.service';
import { ModePaiement } from '../../models/modePaiement.model';

@Component({
  selector: 'app-mode-form',
  imports: [
    ReactiveFormsModule,
    FormInputComponent
  ],
  templateUrl: './mode-form.component.html',
  styleUrl: './mode-form.component.css'
})
export class ModeFormComponent {

   constructor(
    private fb: FormBuilder,
    private modePaiementService : ModePaiementService
  ) {}

  modePaiementForm = new FormGroup({
    nom : new FormControl('')
  });

  submit() {
      if (this.modePaiementForm.invalid) return;
      const formValue = this.modePaiementForm.value;
  
      const newMode: ModePaiement = {
        nom: formValue.nom || ''
      };
  
      this.modePaiementService.create(newMode)
        .subscribe({
          next: (res) => {
            console.log('Mode de paiement created:', res);
            this.modePaiementForm.reset();
          },
          error: (err) => {
            console.error(err);
            alert(err.error?.message || 'Erreur');
          }
        });
    }

}
