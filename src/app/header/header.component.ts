import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('auth');
  }

  logOut() {
    localStorage.setItem('logoutNotification', 'Usuário desconectado!');
    localStorage.removeItem('auth');
    location.reload();
  }
}
