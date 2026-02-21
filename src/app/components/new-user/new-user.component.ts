import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, InputTextModule, RouterModule],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {

  private userService = inject(UserService);
  private router = inject(Router);

  firstName: string = '';
  lastName: string = '';
  email: string = '';

  register() {
    const newUser = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    };

    try {
      this.userService.addUser(newUser);
      console.log('User registered:', newUser);

      this.firstName = '';
      this.lastName = '';
      this.email = '';

      alert('Registration successful!');
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Registration failed:', error);
    }
    
  }
}
