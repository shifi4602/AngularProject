import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class BasketServiceService {
  private items: Product[] = [];
  private totalPrice: number = 0;
  private storageKey = 'basket';

  constructor() {
    this.getItems();
    this.loadFromSession();
  }

  public getItems(): Product[] {
    return this.items;
  }

  addProductTBasket(product: Product) {
    this.items.push(product);
    this.totalPrice += product.price;
  }

  removeProduct(product: Product) {
    const index = this.items.findIndex(p => p.Products_id === product.Products_id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.totalPrice -= product.price;
      if (this.totalPrice < 0) this.totalPrice = 0;
    }
    this.items = this.items.filter(p => p.Products_id !== product.Products_id);
    this.saveToSession();
  }

  clearBasket(): void {
    this.items = [];
    this.totalPrice = 0;
    this.items = [];
    sessionStorage.removeItem(this.storageKey);
  }

  private saveToSession() {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  private loadFromSession() {
    const data = sessionStorage.getItem(this.storageKey);
    this.items = data ? JSON.parse(data) : [];
  }

  addProduct(product: Product) {
    const existing = this.items.find(p => p.Products_id === product.Products_id);

    if (existing) {
      existing.quantity = (existing.quantity || 0) + 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }

    this.saveToSession();
  }

  getTotalPrice(): number {
  return this.items.reduce((sum, item) => 
    sum + (item.price * (item.quantity || 1)), 0);
}

  increase(product: Product) {
    const item = this.items.find(p => p.Products_id === product.Products_id);
    if (item) {
      item.quantity = (item.quantity || 1) + 1;
      this.saveToSession();
    }
  }

  decrease(product: Product) {
    const item = this.items.find(p => p.Products_id === product.Products_id);
    if (item) {
      item.quantity = (item.quantity || 1) - 1;

      if (item.quantity <= 0) {
        this.removeProduct(product);
      }

      this.saveToSession();
    }
  }
}
