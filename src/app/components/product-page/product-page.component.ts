import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { InputNumber } from 'primeng/inputnumber';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../service/products.service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ImageModule, CardModule, ButtonModule, InputNumber, FormsModule, CurrencyPipe, RouterModule, RouterLink],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {

  private productsService = inject(ProductsService);

  private route = inject(ActivatedRoute);

  product?: Product;
  quantity: number = 1;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.product = this.productsService.getProducts()()
      .find(p => p.Products_id === id);

    console.log(this.product);
  }
}