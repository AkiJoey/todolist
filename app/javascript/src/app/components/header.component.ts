import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div id="header">
      <div id="nav">
        <img id="logo" src="/favicon.ico" alt="logo" />
        <div id="title">TimeManagement</div>
        <div id="btn">
          <a href="https://akijoey.com" matTooltip="AkiJoey">
            <img id="avatar" src="/avatar.png" alt="avatar" />
          </a>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['/app/assets/stylesheets/header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
