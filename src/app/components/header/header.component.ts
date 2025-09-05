import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router) { }
  logout() {
    localStorage.removeItem('jwt');
    alert('Logged out successfully');
    this.router.navigate(['/auth']);
  }
  goTo = (path: string): void => {
    this.router.navigate([path]);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }
}
