import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../../shared/components/form/form-input/form-input.component';

@Component({
  selector: 'app-etage-form',
  templateUrl: './etage-form.component.html',
  imports: [
    ReactiveFormsModule,
    FormInputComponent
  ]
})
export class EtageFormComponent {

  etageForm = new FormGroup({
    nom: new FormControl(''),
    nombre: new FormControl('')
  });

  submit() {
    console.log('FORM VALUE:', this.etageForm.value);
  }
}
