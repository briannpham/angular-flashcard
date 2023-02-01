import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Angular Flashcard';
  links = [
    { path: '/home', icon: 'home', title: 'Home' },
    { path: '/cards', icon: 'view_list', title: 'Cards' },
    { path: '/login', icon: 'view_list', title: 'Sign in' },
    { path: '/signup', icon: 'view_list', title: 'Register' },
  ];

  constructor() {}
}
