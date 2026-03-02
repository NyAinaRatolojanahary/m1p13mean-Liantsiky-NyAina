import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../../../shared/components/form/form-input/form-input.component';
import { FormSelectComponent } from '../../../../../shared/components/form/form-select/form-select.component';
import { BoxService } from '../../services/box.service';
import { BoutiqueService } from '../../../boutique/services/boutique.service';
import { ContratBox } from '../../models/contratBox.model';

@Component({
  selector: 'app-box-contrat-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormInputComponent,
    FormSelectComponent
  ],
  templateUrl: './box-contrat-form.component.html',
  styleUrl: './box-contrat-form.component.css'
})
export class BoxContratFormComponent implements OnInit {
  constructor(
    private fb : FormBuilder,
    private boxService : BoxService,
    private boutiqueService : BoutiqueService
  ) { }

  boxes : any[] = [];
  boutiques : any[] = [];
  
  contratForm = new FormGroup({
    boxId : new FormControl(''),
    boutiqueId : new FormControl(''),
    dateDebut : new FormControl(new Date()),
    dateFin : new FormControl(new Date())
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    // Load boxes for select
    this.boxService.getAll().subscribe({
      next: (data) => {
        this.boxes = data;
      },
      error: (err) => {
        console.error('Error loading boxes:', err);
      }
    });

    // Load boutiques for select
    this.boutiqueService.getAll().subscribe({
      next: (data) => {
        this.boutiques = data;
      },
      error: (err) => {
        console.error('Error loading boutiques:', err);
      }
    });
  }

  submit() {
    if (this.contratForm.invalid) return;

    const formValue = this.contratForm.value;

    const contratBox : ContratBox = {
      boxId: formValue.boxId || '',
      boutiqueId: formValue.boutiqueId || '',
      dateDebut: formValue.dateDebut || new Date(),
      dateFin: formValue.dateFin || new Date(), 
    };

    console.log('Submitting contratBox:', contratBox);

    this.boxService.createContrat(contratBox)
      .subscribe({
        next: (res) => {
          console.log('Contrat created:', res);
          this.contratForm.reset();
        },
        error: (err) => {
          console.error('Error creating contrat:', err);
          // alert(err.error?.message || 'Erreur');
        }
      });
  }

}
