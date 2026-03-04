import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from '../../services/log-in.service';

@Component({
  selector: 'app-log-in',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private logService : LogInService
  ) {}
  
  loginForm = new FormGroup({
    email : new FormControl('admin@itu.com'),
    password : new FormControl('admin')
  })

  onSubmit() {
    if (this.loginForm.invalid) return;
      const formValue = this.loginForm.value;
      const credentials = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!
      };


    this.logService.login(credentials).subscribe({
    next: (res) => {
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', res.user.email); // adapt to your response
      this.router.navigate(['/admin']);
    },
    error: () => {
      alert('Login failed');
    }
  });
  }
}
