import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  loading = true;
  error = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.loading = true;
    this.http.get('http://localhost:5000/api/profile')
      .subscribe({
        next: (res: any) => {
          this.user = res;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load profile';
          console.error(err);
          this.loading = false;
        }
      });
  }
}
