import { Component, Input } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  standalone: true,  
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

})
export class FormInputComponent {

  @Input() label!: string;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() control!: FormControl;
  @Input() required: boolean = false;

}
