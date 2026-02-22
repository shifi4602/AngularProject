import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

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
      { firstName: 'Shlomo', lastName: 'Cohen', email: 'shlomo@example.com' },
      { firstName: 'Maya', lastName: 'Levi', email: 'maya@example.com' }
    ];
    this.usersSignal.set(dummy);
  }

  // Return read-only view of users
  getUsers() {
    return this.usersSignal.asReadonly();
  }

  getCurrentUser() {
    return this.currentUserSignal.asReadonly();
  }

  // Find a user by id
  // getUserById(id: number): User | undefined {
  //   return this.usersSignal().find(u => u.userId === id);
  // }

  // Add a new user
  addUser(user: User): void {
    this.usersSignal.update(list => [...list, user]);
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
