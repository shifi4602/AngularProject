import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesSignal = signal<Category[]>([]);

  constructor() {
    this.loadDummyCategories();
  }

  private loadDummyCategories() {
    const dummy: Category[] = [
      { Category_Id: 1, Category_name: 'Baking' },
      { Category_Id: 2, Category_name: 'Electric' },
      { Category_Id: 3, Category_name: 'Knives' }
    ];
    this.categoriesSignal.set(dummy);
  }

  // Return a read-only view of all categories
  getCategories() {
    return this.categoriesSignal.asReadonly();
  }
}
