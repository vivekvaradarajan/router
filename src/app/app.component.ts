import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="menu">    
      <a routerLink="/superheroes" routerLinkActive="active">DASHBOARD</a>
      <a routerLink="/survey-center" routerLinkActive="active">RISC</a>
      <a routerLink="/admin" routerLinkActive="active">ANALYTICS</a>
    </nav>
    <div class="main-body">
    <router-outlet></router-outlet>
    <router-outlet name="popup"></router-outlet>
    </div>
  `
})
export class AppComponent {
}
