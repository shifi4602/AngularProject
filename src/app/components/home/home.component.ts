import { Component } from '@angular/core';
import { ImageModule } from 'primeng/image';
import { HeaderComponent } from "../header/header.component";
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImageModule, HeaderComponent, RouterModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
