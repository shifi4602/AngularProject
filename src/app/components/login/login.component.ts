import { Component, inject } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, CardModule, ButtonModule, InputTextModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private router = inject(Router);
  private userService = inject(UserService);
  username: string = '';
  email: string = '';
  

  login() {
    const success = this.userService.loginUser(this.username, this.email);
    if (success) {
      console.log('Login successful');
      // Optionally, navigate to another page or show a success message
      alert('Login successful!');
      this.router.navigate(['/']);
    } else {
      console.log('Login failed');
      // Optionally, show an error message to the user
    }
  }
}
