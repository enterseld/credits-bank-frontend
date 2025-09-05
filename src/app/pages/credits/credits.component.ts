import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-credits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.scss'
})
export class CreditsComponent {
  credits: any[] = [];
  loading = false;
  error: string | null = null;

  showPopup = false;
  selectedCredit: any = null;
  payAmount: number | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCredits();
  }

  getCredits() {
    this.loading = true;
    this.error = null;

    this.http.get<{ data: any[] }>('http://localhost:5000/api/creditsByUser')
      .subscribe({
        next: res => {
          this.credits = res.data;
          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.error = 'Failed to load credits';
          this.loading = false;
        }
      });
  }

  formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  callUpdate(credit: any) {
    this.selectedCredit = credit;
    this.payAmount = null;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.selectedCredit = null;
  }

  payPartial() {
    if (this.payAmount && this.selectedCredit) {
      this.http.patch(`http://localhost:5000/api/credit`, { creditId: this.selectedCredit._id, newAmount: this.payAmount })
        .subscribe(() => {
          this.getCredits();
          this.closePopup();
        });
    }
  }

  payFull() {
    if (this.selectedCredit) {
      this.http.delete(`http://localhost:5000/api/credit`, {
        body: {
          creditId: this.selectedCredit._id,
          isPaid: true
        }
      }).subscribe(() => {
        this.getCredits();
        this.closePopup();
      });
    }
  }
}
