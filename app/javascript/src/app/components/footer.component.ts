import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <div id="footer">
      <div id="copyright">©2019 By <a href="https://akijoey.com">AkiJoey</a></div>
      <div id="framework">Driven <a href="https://rubyonrails.org">Rails</a> + <a href="https://angular.io">Angular</a></div>
    </div>
  `,
  styleUrls: ['/app/assets/stylesheets/footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
