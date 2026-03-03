import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="mb-3">
      <label *ngIf="label" class="form-label">
        {{ label }}
        <span *ngIf="required" class="text-danger">*</span>
      </label>
      <select 
        [formControl]="control" 
        class="form-select custom-select">
        <option value="" disabled selected>{{ placeholder }}</option>
        <option *ngFor="let opt of options" [value]="opt[optionValue]">
          {{ opt[optionLabel] }}
        </option>
      </select>
    </div>
  `,
  styles: [`
    .custom-select {
        display: block;
        width: 100%;
        padding: 0.375rem 2.25rem 0.375rem 0.75rem;
        -moz-padding-start: calc(0.75rem - 3px);
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        background-color: #fff;
        background-repeat: no-repeat;
        background-position: right 0.75rem center;
        background-size: 16px 12px;
        border: 1px solid #ced4da;
        border-radius: 0.375rem;
        transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        appearance: none;
    }
  `]
})
export class FormSelectComponent {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() required: boolean = false;
  @Input() control!: FormControl;
  @Input() options: any[] = [];
  @Input() optionLabel = 'label';
  @Input() optionValue = 'value';
}