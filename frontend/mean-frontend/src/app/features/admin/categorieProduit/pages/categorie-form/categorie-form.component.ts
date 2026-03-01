import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../../../shared/components/form/form-input/form-input.component';
import { CategorieService } from '../../services/categorie.service';
import { CategorieProduit } from '../../models/categorieProduit.model';

@Component({
  selector: 'app-categorie-form',
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    CommonModule
  ],
  templateUrl: './categorie-form.component.html',
  styleUrl: './categorie-form.component.css'
})
export class CategorieFormComponent {
  constructor(
    private fb: FormBuilder,
    private categorieService: CategorieService
  ) { }

  categorieForm = new FormGroup({
    nom: new FormControl(''),
    image: new FormControl('')
  });

  submit() {
      if (this.categorieForm.invalid) return;
      const formValue = this.categorieForm.value;
  
      const newCategorie: CategorieProduit = {
        nom: formValue.nom || '',              // ensure string
        image: Number(formValue.image)       // convert string to number
      };
  
      this.categorieService.create(newCategorie)
        .subscribe({
          next: (res) => {
            console.log('Categorie created:', res);
            this.categorieForm.reset();
          },
          error: (err) => {
            console.error(err);
            alert(err.error?.message || 'Erreur');
          }
        });
    }
}
