// auth-page.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  isLogin = true; // toggle between login/register
  loginForm: FormGroup;
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      ownershipType: ['', Validators.required],
      address: [''],
      contactPerson: ['']
    });
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.errorMessage = '';
  }

  async submit() {
    this.errorMessage = '';
    try {
      if (this.isLogin) {
        if (this.loginForm.invalid) return;

        const loginResponse: any = await firstValueFrom(
          this.http.post('http://localhost:5000/api/login', this.loginForm.value)
        );

        localStorage.setItem('jwt', loginResponse.token);
        alert('Logged in successfully!');
      } else {
        if (this.registerForm.invalid) return;

        const registerResponse: any = await firstValueFrom(
          this.http.post('http://localhost:5000/api/register', this.registerForm.value)
        );

        alert('Registered successfully! You can now login.');
        this.toggleForm();
      }
    } catch (err: any) {
      this.errorMessage = err?.error?.message || 'An error occurred';
    }
  }
}
