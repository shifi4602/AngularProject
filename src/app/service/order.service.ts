import { Injectable, signal } from '@angular/core';
import { Order } from '../models/order.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersSignal = signal<Order[]>([]);

  constructor(private userService: UserService) {
    this.loadDummyOrders();
  }

  private getNextOrderId(): number {
    const ids = this.ordersSignal().map(order => order.orderId ?? 0);
    const maxId = ids.length ? Math.max(...ids) : 0;
    return maxId + 1;
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
    const currentUser = this.userService.getCurrentUser()();

    if (!currentUser) {
      throw new Error('User must be logged in to place an order.');
    }

    if (!currentUser.userId || currentUser.userId <= 0) {
      throw new Error('Current user has an invalid user ID.');
    }

    const newOrder: Order = {
      ...order,
      orderId: order.orderId && order.orderId > 0 ? order.orderId : this.getNextOrderId(),
      userId: currentUser.userId,
      date: order.date ? new Date(order.date) : new Date(),
      status: order.status || 'Placed'
    };

    this.ordersSignal.update(list => [...list, newOrder]);
    this.userService.addOrderToUser(currentUser.userId, newOrder);
  }
}
