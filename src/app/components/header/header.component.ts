import { Component, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, InputTextModule, BadgeModule, ButtonModule, ImageModule, CommonModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private userService = inject(UserService);
  currentUser = this.userService.getCurrentUser();

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      { label: 'דף הבית', routerLink: '/' },
      { label: 'בישול', routerLink: '/cook' },
      { label: 'אפייה', routerLink: 'products' },
      { label: 'אירוח והגשה', routerLink: 'hosting-and-srving' },
      { label: 'אביזרי מטבח', routerLink: 'kitchen' },
      { label: 'סכינים', routerLink: 'knifes' },
      { label: 'מוצרי חשמל', routerLink: 'electric' },
      { label: 'אחסון וארגון', routerLink: 'organization' },
      { label: 'פחי אשפה', routerLink: 'garbige' },
      { label: 'TO GO', routerLink: 'to-go' },
      { label: 'סניפים', routerLink: 'branches' }
    ];
  }
}
