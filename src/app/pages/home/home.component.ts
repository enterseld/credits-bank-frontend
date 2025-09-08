import { Component } from '@angular/core';
import { CreditPopupComponent } from '../../components/credit-popup/credit-popup.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [CreditPopupComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomePageComponent {
  showCreditPopup = false;
  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  openPopup() {
    if (this.isLoggedIn()) {
      this.showCreditPopup = true;
    }
    else {
      this.router.navigate(['/auth']);
    }
  }

  closePopup() {
    this.showCreditPopup = false;
  }

}