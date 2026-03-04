import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../../../shared/components/form/form-input/form-input.component';
import { JetonService } from '../../services/jeton.service';
import { Jeton } from '../../models/jeton.model';

@Component({
  selector: 'app-jeton-form',
  imports: [
    ReactiveFormsModule,
    FormInputComponent
  ],
  templateUrl: './jeton-form.component.html',
  styleUrl: './jeton-form.component.css'
})
export class JetonFormComponent {
  constructor(
    private fb: FormBuilder,
    private jetonService : JetonService
  ) {}

  jetonForm = new FormGroup({
    nom : new FormControl(''),
    montant : new FormControl('')
  })

  submit() {
      if (this.jetonForm.invalid) return;
      const formValue = this.jetonForm.value;
  
      const newJeton: Jeton = {
        nom: formValue.nom || '',              // ensure string
        montant: Number(formValue.montant)       // convert string to number
      };
  
      this.jetonService.create(newJeton)
        .subscribe({
          next: (res) => {
            console.log('Etage created:', res);
            this.jetonForm.reset();
          },
          error: (err) => {
            console.error(err);
            alert(err.error?.message || 'Erreur');
          }
        });
    }

}
