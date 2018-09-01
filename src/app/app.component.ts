import { Component } from '@angular/core';

import {person} from './person';

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

    <h1>Angular dynamic reactive forms</h1>

    <dynamic-form [dataObject]="person"></dynamic-form>
  `
})
export class AppComponent {
  person;

  constructor(){
    this.person=person;
  }
}
