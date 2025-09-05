import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-credit-popup',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './credit-popup.component.html',
  styleUrl: './credit-popup.component.scss'
})

export class CreditPopupComponent {
  @Output() close = new EventEmitter<void>();

  creditTypeForm: FormGroup;
  creditForm: FormGroup;
  creditTypeId: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.creditTypeForm = this.fb.group({
      conditions: ["", Validators.required],
      interestRate: ["", Validators.required],
      termNumber: ["", [Validators.required, Validators.min(1)]],
      termUnit: ["", Validators.required],
      startingAmount: ["", [Validators.required, Validators.min(0)]]
    });

    this.creditForm = this.fb.group({
      creditTypeId: ['', Validators.required]
    });
  }

  submit = async () => {
    if (this.creditTypeForm.valid) {
      try {
        const termNumber = this.creditTypeForm.get('termNumber')?.value;
        const termUnit = this.creditTypeForm.get('termUnit')?.value;
        const combinedTerm = `${termNumber} ${termUnit}`;

        const creditTypePayload = {
          conditions: this.creditTypeForm.get('conditions')?.value,
          interestRate: this.creditTypeForm.get('interestRate')?.value,
          term: combinedTerm
        };

        const token = localStorage.getItem('jwt');

        this.creditTypeId = await firstValueFrom(
          this.http.patch(
            'http://localhost:5000/api/credit-type',
            creditTypePayload
          )
        );
      }
      catch (err) {
        console.log(err);
      }

      if (this.creditTypeId) {
        try {
          this.creditForm.get('creditTypeId')?.setValue(this.creditTypeId);
          const token = localStorage.getItem('jwt');
          await firstValueFrom(
            this.http.post('http://localhost:5000/api/credit', {
              creditTypeId: this.creditTypeId,
              startingAmount: this.creditTypeForm.get('startingAmount')?.value,
            })
          );
          alert('Credit successfully created!');
          this.close.emit();
        }
        catch (err) {
          console.log(err);
        }
      }
    }
  }
}