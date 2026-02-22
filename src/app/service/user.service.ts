import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';

import { ExistingUser } from '../models/existing-user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usersSignal = signal<User[]>([]);
  private currentUserSignal = signal<User | null>(null);

  constructor() {
    this.loadDummyUsers();
  }

  private loadDummyUsers() {
    const dummy: User[] = [
      { userId: 1, firstName: 'Shlomo', lastName: 'Cohen', email: 'shlomo@example.com' , isAdmin: false, password: '1234', orders: []},
      { userId: 2, firstName: 'Maya', lastName: 'Levi', email: 'maya@example.com' , isAdmin: false, password: '5678', orders: []}
    ];
    this.usersSignal.set(dummy);
  }

  private getNextUserId(): number {
    const ids = this.usersSignal().map(user => user.userId ?? 0);
    const maxId = ids.length ? Math.max(...ids) : 0;
    return maxId + 1;
  }

  // Return read-only view of users
  getUsers() {
    return this.usersSignal.asReadonly();
  }

  getCurrentUser() {
    return this.currentUserSignal.asReadonly();
  }

  // Find a user by id
   getUserById(id: number): User | undefined {
     return this.usersSignal().find(u => u.userId === id);
   }

  // Add a new user
  addUser(user: User): void {
    if (!user.userId || user.userId <= 0) {
      user.userId = this.getNextUserId();
    }

    if (!user.orders) {
      user.orders = [];
    }

    this.usersSignal.update(list => [...list, user]);
  }

  addOrderToUser(userId: number, order: Order): void {
    this.usersSignal.update(users =>
      users.map(user =>
        user.userId === userId
          ? { ...user, orders: [...(user.orders ?? []), order] }
          : user
      )
    );

    const current = this.currentUserSignal();
    if (current?.userId === userId) {
      this.currentUserSignal.set({ ...current, orders: [...(current.orders ?? []), order] });
    }
  }

  setCurrentUser(user: User | null): void {
    this.currentUserSignal.set(user);
  }

  // Login by matching an existing user object (firstName + email)
  // Returns the matched User or null if not found
  loginUser(username: string, email: string): User | null {
    const user = this.usersSignal().find(u => u.firstName === username && u.email === email);
    this.currentUserSignal.set(user ?? null);
    return user ?? null;
  }
}
