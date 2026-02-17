import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

import { ExistingUser } from '../models/existing-user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private usersSignal = signal<User[]>([]);

  constructor() {
    this.loadDummyUsers();
  }

  private loadDummyUsers() {
    const dummy: User[] = [
      { userId: 1, firstName: 'Shlomo', lastName: 'Cohen', email: 'shlomo@example.com' },
      { userId: 2, firstName: 'Maya', lastName: 'Levi', email: 'maya@example.com' }
    ];
    this.usersSignal.set(dummy);
  }

  // Return read-only view of users
  getUsers() {
    return this.usersSignal.asReadonly();
  }

  // Find a user by id
  getUserById(id: number): User | undefined {
    return this.usersSignal().find(u => u.userId === id);
  }

  // Add a new user
  addUser(user: User): void {
    this.usersSignal.update(list => [...list, user]);
  }

  // Login by matching an existing user object (userId + email)
  // Returns the matched User or null if not found
  loginUser(existing: ExistingUser): User | null {
    const user = this.usersSignal().find(u => u.userId === existing.userId && u.email === existing.email);
    return user ?? null;
  }
}
