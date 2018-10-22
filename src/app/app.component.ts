import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="menu">    
      <a href="">DASHBOARD</a>
      <a routerLink="/survey-center" routerLinkActive="active">RISC</a>
      <a href="">ANALYTICS</a>
    </nav>
    <div class="main-body">
    <router-outlet></router-outlet>
    <router-outlet name="popup"></router-outlet>
    </div>
  `
})
export class AppComponent {
}
