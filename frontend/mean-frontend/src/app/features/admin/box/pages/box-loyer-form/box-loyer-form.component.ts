import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoxService } from '../../services/box.service';
import { FormInputComponent } from '../../../../../shared/components/form/form-input/form-input.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-box-loyer-form',
  imports: [
    ReactiveFormsModule,
    FormInputComponent,
    CommonModule
  ],
  templateUrl: './box-loyer-form.component.html',
  styleUrl: './box-loyer-form.component.css'
})
export class BoxLoyerFormComponent implements OnInit {
  // form!: FormGroup;
  boxId!: string;
  loading = false;

  loyerForm = new FormGroup({
    loyer: new FormControl(null, Validators.required),
    dateApplication: new FormControl(new Date().toISOString().substring(0,10), Validators.required)
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private boxService: BoxService
  ) {}

  ngOnInit() {
    // Get box ID from route parameters
  this.boxId = this.route.snapshot.paramMap.get('id')!;

   this.loyerForm = this.fb.group({
      loyer: [null, Validators.required],
      dateApplication: [
        new Date().toISOString().substring(0,10),
        Validators.required
      ]
    });
  }

  submit() {

  if (this.loyerForm.invalid) return;

  this.loading = true;

  this.boxService.updateLoyer(this.boxId, this.loyerForm.value)
    .subscribe({
      next: () => {
        alert('Loyer mis à jour');
        this.router.navigate(['admin/box/list']); // back to list
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
}
}
