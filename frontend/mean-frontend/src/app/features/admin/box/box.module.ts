import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxFormComponent } from './pages/box-form/box-form.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BoxListComponent } from './pages/box-list/box-list.component';



@NgModule({
  declarations: [
    BoxFormComponent,
    BoxListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class BoxModule { }
