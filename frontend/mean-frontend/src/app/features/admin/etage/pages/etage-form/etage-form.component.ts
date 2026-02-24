import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../../../shared/components/form/form-input/form-input.component';
import { EtageService } from '../../services/etage.service';
import { Etage } from '../../models/etage.model';

@Component({
  selector: 'app-etage-form',
  templateUrl: './etage-form.component.html',
  imports: [
    ReactiveFormsModule,
    FormInputComponent
  ]
})
export class EtageFormComponent {
  constructor(
    private fb: FormBuilder,
    private etageService: EtageService
  ) {}

  etageForm = new FormGroup({
    nom: new FormControl(''),
    nombreBox: new FormControl('')
  });

  submit() {
    if (this.etageForm.invalid) return;
    const formValue = this.etageForm.value;

    const newEtage: Etage = {
      nom: formValue.nom || '',              // ensure string
      nombreBox: Number(formValue.nombreBox)       // convert string to number
    };

    this.etageService.create(newEtage)
      .subscribe({
        next: (res) => {
          console.log('Etage created:', res);
          this.etageForm.reset();
        },
        error: (err) => {
          console.error(err);
          alert(err.error?.message || 'Erreur');
        }
      });
  }
}
