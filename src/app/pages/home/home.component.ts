import { Component } from '@angular/core';
import { CreditPopupComponent } from '../../components/credit-popup/credit-popup.component';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [CreditPopupComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomePageComponent {
  showCreditPopup = false;

  openPopup() {
    this.showCreditPopup = true;
  }

  closePopup() {
    this.showCreditPopup = false;
  }
}