import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { CardModule } from 'primeng/card';
import { ButtonModule, } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProductFormComponent } from '../product-form/product-form.component';
import { addOrEdit } from '../../models/addOrEditEnum.model';
import { Router, RouterModule } from '@angular/router';
import { BasketServiceService } from '../../service/basket-service.service';
import { Product } from '../../models/products.model';
import { FilterComponent } from './filter/filter.component';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardModule, ButtonModule, FormsModule, ProductFormComponent, CommonModule, RouterModule, FilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  private productService = inject(ProductsService);
  private basketService = inject(BasketServiceService);
  //products = this.productService.getProducts();
  addOrEditVal: addOrEdit = 0;


  allProducts = this.productService.getProducts();
  filteredProducts: Product[] = [];

  ngOnInit() {
    this.filteredProducts = [...this.allProducts()];
    console.log("in");
  }


  onFilterChanged(filter: any) {

    const isEmpty =
      !filter.name &&
      !filter.description &&
      (!filter.categories || filter.categories.length === 0) &&
      filter.maxPrice === 250;

    if (isEmpty) {
      this.resetProducts();
      return;
    }

    const originalProducts = this.allProducts();

    this.filteredProducts = originalProducts.filter(product => {
      const searchName = (filter.name || '').toLowerCase().trim();
      const searchDescription = (filter.description || '').toLowerCase().trim();
      const categories = filter.categories || [];

      const productName = (product.Product_name || '').toLowerCase();
      const productDescription = (product.description || '').toLowerCase();

      return (
        (searchName === '' || productName.includes(searchName)) &&
        (searchDescription === '' || productDescription.includes(searchDescription)) &&
        product.price <= filter.maxPrice &&
        (categories.length === 0 || categories.includes(product.category))
      );
    });
  }


  resetProducts() {
    this.filteredProducts = [...this.allProducts()];
  }

  constructor() {
  }

  addToBasket(product: Product) {
    this.basketService.addProductTBasket(product);
    // optional: simple feedback
    console.log('added to basket', product.Product_name);
  }

  private router = inject(Router);

  goToProduct(product: Product) {
    this.router.navigate(['/products-page'], {
      state: { product }
    });
  }
}
