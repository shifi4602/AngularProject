import { Injectable, signal } from '@angular/core';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSignal = signal<Order[]>([]);

  constructor() {
    this.loadDummyOrders();
  }

  private loadDummyOrders() {
    const dummy: Order[] = [
      { orderId: 1, orderSum: 120, items: [], date: new Date(), userId: 1 },
      { orderId: 2, orderSum: 250, items: [], date: new Date(), userId: 2 }
    ];
    this.ordersSignal.set(dummy);
  }

  // Readonly view
  getOrders() {
    return this.ordersSignal.asReadonly();
  }

  // Find order by id
  getOrderById(id: number): Order | undefined {
    return this.ordersSignal().find(o => o.orderId === id);
  }

  // Add a new order
  addOrder(order: Order): void {
    this.ordersSignal.update(list => [...list, order]);
  }
}
