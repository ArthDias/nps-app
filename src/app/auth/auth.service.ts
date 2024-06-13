import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  constructor(private router: Router) {
    this.isAuthenticated = localStorage.getItem('auth') === 'true';
   }

  register(email: string, password: string) {
    const users = this.getUsers();
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    this.router.navigate(['/login']);
  }

  login(email: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      this.isAuthenticated = true;
      localStorage.setItem('auth', 'true');
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('auth');
    this.router.navigate(['/login']);
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }

  private getUsers(): Array<{ email: string, password: string }> {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }
}
