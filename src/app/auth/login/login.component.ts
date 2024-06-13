import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    if (this.email && this.password) {
      const isAuthenticated = this.authService.login(this.email, this.password);
      if (!isAuthenticated) {
        this.errorMessage = 'Invalid email or password';
      }
      this.router.navigate(['/dashboard']);
    }
  }
}
