import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BasketServiceService } from '../../service/basket-service.service';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, InputTextModule, DropdownModule, FormsModule, RouterModule],
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  private basketService = inject(BasketServiceService);
  private router = inject(Router);
  cardNumber = '';
  expiry: Date | null = null;
  cvv = '';
  streetAddress = '';
  city = '';
  postalCode = '';
  total = 0;

  cities: string[] = [
    'Jerusalem',
    'Tel Aviv',
    'Haifa',
    'Rishon LeZion',
    'Petah Tikva',
    'Ashdod',
    'Netanya',
    'Beersheba',
    'Holon',
    'Bnei Brak',
    'Ramat Gan',
    'Bat Yam',
    'Ashkelon',
    'Rehovot',
    'Herzliya',
    'Kfar Saba',
    'Hadera',
    'Modiin',
    'Nazareth',
    'Raanana'
  ];

  ngOnInit(): void {
    this.total = this.basketService.getTotalPrice();
  }

  pay(): void {
    if (!this.cardNumber || !this.expiry || !this.cvv || !this.streetAddress || !this.city || !this.postalCode) {
      alert('Please fill all payment and address fields');
      return;
    }

    // Simulate payment success
    alert('Payment successful — ' + this.total.toFixed(2));
    this.basketService.clearBasket();
    this.cardNumber = '';
    this.expiry = null;
    this.cvv = '';
    this.streetAddress = '';
    this.city = '';
    this.postalCode = '';
    this.total = 0;
    
    // Navigate to home page
    this.router.navigate(['/home']);
  }
}
