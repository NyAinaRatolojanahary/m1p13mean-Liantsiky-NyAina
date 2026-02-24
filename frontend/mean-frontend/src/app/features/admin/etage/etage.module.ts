import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtageFormComponent } from './etage-form/etage-form.component';
import { SharedModule } from  "../../../shared/shared.module";
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EtageFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EtageModule { }
