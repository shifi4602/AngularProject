import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BasketServiceService } from '../../service/basket-service.service';
import { Product } from '../../models/products.model';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  private basketService = inject(BasketServiceService);
  items = signal<Product[]>([]);
  total = signal<number>(0);

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.items.set(this.basketService.getItems());
    this.total.set(this.basketService.getTotalPrice());
  }

  remove(item: Product) {
    this.basketService.removeProduct(item);
    this.refresh();
  }

  clear() {
    this.basketService.clearBasket();
    this.refresh();
  }

  increase(item: Product) {
    this.basketService.increase(item);
    this.refresh();
  }

  decrease(item: Product) {
    this.basketService.decrease(item);
    this.refresh();
  }

}
