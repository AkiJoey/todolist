import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <app-header></app-header>
      <app-content></app-content>
      <app-footer></app-footer>
    `,
  styleUrls: ['/app/assets/stylesheets/app.component.scss']
})
export class AppComponent {
  // name = 'Angular!';
}
