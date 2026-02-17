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
  products = this.productService.getProducts();
  addOrEditVal: addOrEdit = 0;
  constructor() {
  }
  ngOnInit(): void {
    console.log("in");
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
