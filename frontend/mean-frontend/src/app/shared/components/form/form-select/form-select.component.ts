import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgSelectComponent } from '@ng-select/ng-select';




export interface SelectOption {
  label: string;
  value: string;
  dataBg?: string;
}

@Component({
  selector: 'app-form-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NgSelectComponent],
  templateUrl: './form-select.component.html',
})
export class FormSelectComponent {
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() required: boolean = false;
  @Input() control!: FormControl;
  @Input() options: any[] = [];

  // which property to display
  @Input() optionLabel = 'label';

  // which property is sent as value
  @Input() optionValue = 'value';

  // ===== INTERNAL VALUE =====
  value: any;

  disabled = false;

  // ===== ControlValueAccessor =====
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // ===== EVENT =====
  change(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.value = val;
    this.onChange(val);
    this.onTouched();
  }
}