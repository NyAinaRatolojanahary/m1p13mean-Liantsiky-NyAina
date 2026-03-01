import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxFormComponent } from '../box/pages/box-form/box-form.component';
import { BoutiqueFormComponent } from './pages/boutique-form/boutique-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BoutiqueFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class BoutiqueModule { }
