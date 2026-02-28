import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from '../../../../../shared/components/form/form-input/form-input.component';
import { FormSelectComponent } from '../../../../../shared/components/form/form-select/form-select.component';
import { BoxService } from '../../services/box.service';
import { Box } from '../../models/box.model';
import { EtageService } from '../../../etage/services/etage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-box-form',
  imports: [
    ReactiveFormsModule, 
    FormInputComponent,
    CommonModule,
    FormSelectComponent],
  templateUrl: './box-form.component.html',
  styleUrl: './box-form.component.css'
})

export class BoxFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private boxService: BoxService,
    private etageService: EtageService
  ) {}
  
  //list-etages for select
  etages : any[] = [];

  boxForm = new FormGroup({
    nom : new FormControl(''),
    espacem2 : new FormControl(''),
    loyer : new FormControl(''),
    etageid : new FormControl('')
  });

  ngOnInit() {

    // Load etages for select
    this.loadEtages();

  }

  submit() {
    if (this.boxForm.invalid) return;

    const formValue = this.boxForm.value;
    
    const newBox: Box = {
      nom: formValue.nom || '',
      espacem2: Number(formValue.espacem2),
      loyer: Number(formValue.loyer),
      etageid: formValue.etageid || ''
    };

    this.boxService.create(newBox)
      .subscribe({
        next: (res) => {
          console.log('Box created:');
          this.boxForm.reset();
        },
        error: (err) => {
          console.error(err);
          // alert(err.error?.message || 'Erreur');
        }
      });
  }

  loadEtages() {
      this.etageService.getAll().subscribe({
        next: (res) => {
          this.etages = res;
        },
        error: (err) => {
          console.error('Error loading etages:', err);
          // alert('Erreur lors du chargement des étages');
        }
      });
    }
}
