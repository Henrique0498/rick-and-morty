import { Component } from '@angular/core';

@Component({
  selector: 'component-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
})
export class FooterComponent {
  time = new Date().getFullYear();
}
