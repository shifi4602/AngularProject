import { Injectable, signal } from '@angular/core';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsSignal = signal<Product[]>([]);

  constructor() {
    this.loadProducts();
  }

  private loadProducts() {
    const dummyProducts: Product[] = Array.from({ length: 20 }, (_, i) => ({
      Products_id: i + 1,
      Product_name: `מוצר ${i + 1}`,
      price: Math.floor(Math.random() * 500) + 50,
      Category_Id: (i % 5) + 1,
      Description: `זהו תיאור קצר עבור מוצר מספר ${i + 1}`,
      imageUrl: `assets/images/baking/3pattrns1.jpg` // נתיב תמונה לדוגמה
    }));
    this.productsSignal.set(dummyProducts);
  }


  // פונקציה לחשיפת הסיגנל לקריאה בלבד
  getProducts() {
    return this.productsSignal.asReadonly();
  }

  addProduct(product: Product){
    let productArr = this.productsSignal();
    this.productsSignal().push(product);
  }

  // Filter products by optional criteria.
  // options:
  // - maxPrice?: number           -> include products with price <= maxPrice
  // - description?: string        -> case-insensitive substring match on Description
  // - categories?: number[]       -> Category_Id included in this array
  // - name?: string               -> case-insensitive substring match on Product_name
  // - orderBy?: 'priceAsc'|'priceDesc'|'nameAsc'|'nameDesc'
  filterProducts(options?: {
    maxPrice?: number;
    description?: string;
    categories?: number[];
    name?: string;
    orderBy?: 'priceAsc' | 'priceDesc' | 'nameAsc' | 'nameDesc';
  }): Product[] {
    const { maxPrice, description, categories, name, orderBy } = options || {};

    let result = this.productsSignal();

    if (maxPrice != null) {
      result = result.filter(p => typeof p.price === 'number' ? p.price <= maxPrice : false);
    }

    if (description) {
      const q = description.toLowerCase();
      result = result.filter(p => (p.Description || '').toLowerCase().includes(q));
    }

    if (name) {
      const q = name.toLowerCase();
      result = result.filter(p => (p.Product_name || '').toLowerCase().includes(q));
    }

    if (categories && categories.length) {
      result = result.filter(p => categories.includes(p.Category_Id));
    }

    if (orderBy) {
      const sorted = result.slice();
      switch (orderBy) {
        case 'priceAsc':
          sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
          break;
        case 'priceDesc':
          sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
          break;
        case 'nameAsc':
          sorted.sort((a, b) => String(a.Product_name).localeCompare(String(b.Product_name)));
          break;
        case 'nameDesc':
          sorted.sort((a, b) => String(b.Product_name).localeCompare(String(a.Product_name)));
          break;
      }
      result = sorted;
    }

    return result;
  }
}
