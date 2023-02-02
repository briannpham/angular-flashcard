import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular Flashcard';
  links = [
    { path: '/home', icon: 'home', title: 'Home' },
    { path: '/dashboard', icon: 'dashboard', title: 'Dashboard' },
    { path: '/login', icon: 'login', title: 'Sign in' },
    { path: '/signup', icon: 'how_to_reg', title: 'Register' },
  ];

  constructor(private userService: UserService, private router: Router) {}

  onSignOut() {
    this.userService.user = null;
    this.router.navigateByUrl('/login');
  }
}
