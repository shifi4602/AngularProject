import { Injectable } from '@angular/core';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class BasketServiceService {
  
  private basket: Product[] = [];
  private totalPrice: number = 0;

  constructor() {
    this.getItems();
  }

  public getItems(): Product[] {
    return this.basket;
  }

  addProductTBasket(product: Product){
    this.basket.push(product);
    this.totalPrice += product.price;
  }

  removeProduct(product: Product){
    const index = this.basket.findIndex(p => p.Products_id === product.Products_id);
    if(index > -1){
      this.basket.splice(index, 1);
      this.totalPrice -= product.price;
      if(this.totalPrice < 0) this.totalPrice = 0;
    }
  }

  getTotalPrice(): number {
    return this.totalPrice;
  }

  clearBasket(): void {
    this.basket = [];
    this.totalPrice = 0;
  }
}
