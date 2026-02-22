import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../service/products.service';
import { addOrEdit } from '../../models/addOrEditEnum.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnInit {
  @Input() productId?: number;
  product?: Product;
  editMode = addOrEdit.edit;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Try to get product ID from route params if not passed as input
    if (!this.productId) {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.productId = +id;
      }
    }

    // Load the product
    if (this.productId) {
      this.product = this.productsService.getProductById(this.productId);
    }
  }
}
