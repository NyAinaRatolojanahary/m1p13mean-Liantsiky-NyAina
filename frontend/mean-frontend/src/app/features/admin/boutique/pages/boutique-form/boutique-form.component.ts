import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../../../shared/components/form/form-input/form-input.component';
import { FormSelectComponent } from '../../../../../shared/components/form/form-select/form-select.component';
import { CommonModule } from '@angular/common';
import { BoutiqueService } from '../../services/boutique.service';
import { BoxService } from '../../../box/services/box.service';
import { ShopUserService } from '../../../shopUser/services/shop-user.service';
import { Boutique } from '../../models/boutique.model';

@Component({
  selector: 'app-boutique-form',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormSelectComponent,
    FormInputComponent
  ],
  templateUrl: './boutique-form.component.html',
  styleUrl: './boutique-form.component.css'
})

export class BoutiqueFormComponent implements OnInit {
  constructor(
    private fb : FormBuilder,
    private boutiqueService : BoutiqueService,
    private boxService : BoxService,
    private shopUserService : ShopUserService
  ) {}
  //list  for select
  // boxes : any[] = [];
  shopUsers : any[] = [];

  boutiqueForm = new FormGroup({
    nom : new FormControl(''),
    description : new FormControl(''),
    proprietaireId : new FormControl(''),
    dateCreation : new FormControl(new Date()),
  })

  ngOnInit() {
    this.loadData();
  }
  submit() {
      if (this.boutiqueForm.invalid) return;
  
      const formValue = this.boutiqueForm.value;
      
      const newBoutique: Boutique = {
        nom: formValue.nom || '',
        description: formValue.description || '',
        proprietaireId: formValue.proprietaireId || '',
        dateCreation: formValue.dateCreation || new Date()
      };
  
      this.boutiqueService.create(newBoutique)
        .subscribe({
          next: (res) => {
            console.log('Boutique created:', res);
            this.boutiqueForm.reset();
          },
          error: (err) => {
            console.error(err);
            // alert(err.error?.message || 'Erreur');
          }
        });
    }
    
  loadData() {
    // this.boxService.getAll().subscribe({
    //   next: (res) => {
    //     this.boxes = res;
    //   },
    //   error: (err) => {
    //     console.error('Error loading boxes:', err);
    //   }
    // });

    this.shopUserService.getAllShopUsers().subscribe({
      next: (res) => {
        this.shopUsers = res; // Assuming the response has a 'data' property
      },
      error: (err) => {
        console.error('Error loading shop users:', err);
      }
    });
  }
}
