import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav>    
      <a routerLink="/superheroes" routerLinkActive="active">DASHBOARD</a>
      <a routerLink="/crisis-center" routerLinkActive="active">RISC</a>
      <a routerLink="/admin" routerLinkActive="active">ANALYTICS</a>
    </nav>
    <router-outlet></router-outlet>
    <router-outlet name="popup"></router-outlet>
  `
})
export class AppComponent {
}
