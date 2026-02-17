import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-buying-page',
  standalone: true,
  imports: [HeaderComponent, RouterModule, RouterLink],
  templateUrl: './buying-page.component.html',
  styleUrl: './buying-page.component.scss'
})
export class BuyingPageComponent {

}
