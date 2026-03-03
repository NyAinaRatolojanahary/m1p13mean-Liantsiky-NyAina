import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule,FormGroup, Validators } from '@angular/forms';
import { FormInputComponent } from '../../../../../shared/components/form/form-input/form-input.component';
import { CommonModule } from '@angular/common';
import { ShopUserService } from '../../services/shop-user.service';
import { ShopUser } from '../../models/shopUser.model';

@Component({
  selector: 'app-shop-user-form',
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    CommonModule
  ],
  templateUrl: './shop-user-form.component.html',
  styleUrl: './shop-user-form.component.css'
})
export class ShopUserFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private shopUserService: ShopUserService
  ) {}

  shopUserForm = new FormGroup({
    nom : new FormControl(''),
    prenom : new FormControl(''),
    email : new FormControl('', Validators.email),
    dtn : new FormControl(new Date().toISOString().substring(0,10),Validators.required),
    password : new FormControl('', Validators.minLength(6))
  })

  ngOnInit(): void {}

  submit() {
    if (this.shopUserForm.invalid) return;
    const formValue = this.shopUserForm.value;

    const newShopUser : ShopUser = {
      nom: formValue.nom || '',
      prenom: formValue.prenom || '',
      dtn : formValue.dtn ? new Date(formValue.dtn) : new Date(),
      email: formValue.email || '',
      password: formValue.password || ''
    };

    this.shopUserService.create(newShopUser).subscribe({
      next: (response) => {
        console.log('ShopUser created:', response);
        this.shopUserForm.reset();
      },
      error: (error) => {
        console.error('Error creating ShopUser:', error);
      }
    });
  }
}