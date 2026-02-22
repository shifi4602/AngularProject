import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { addOrEdit } from '../../models/addOrEditEnum.model';
import { Product } from '../../models/products.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductsService } from '../../service/products.service';
import { CATEGORIES } from '../../models/categories.const';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, InputNumberModule, DropdownModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {

  @Input() addOrEditVal: addOrEdit = addOrEdit.add;
  @Input() productToEdit?: Product;
  myForm: FormGroup;
  categories = CATEGORIES.map((cat, index) => ({ label: cat, value: index + 1 }));

  constructor(private fb: FormBuilder, private productsService: ProductsService) {
    this.myForm = this.fb.group({
      productName: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      categoryId: [null, [Validators.required]],
      description: ['', [Validators.required]],
      imgUrl: ['', [Validators.required]],
    });
  }
  
  ngOnInit(): void {
    this.addOrEditValue();
    if (this.addOrEditVal === addOrEdit.edit && this.productToEdit) {
      this.populateForm();
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      if (this.addOrEditVal === addOrEdit.add) {
        this.addProduct();
      } else {
        this.updateProduct();
      }
    }
  }

  addOrEditMessageSignal = signal<string>("");

  resetForm() {
    this.myForm.reset();
  }

  addOrEditValue() {
    if (this.addOrEditVal == addOrEdit.add) {
      this.addOrEditMessageSignal.set("הוסף מוצר");
    }
    if (this.addOrEditVal == addOrEdit.edit) {
      this.addOrEditMessageSignal.set("ערוך מוצר");
    }
  }

  populateForm() {
    if (this.productToEdit) {
      this.myForm.patchValue({
        productName: this.productToEdit.Product_name,
        price: this.productToEdit.price,
        categoryId: this.productToEdit.Category_Id,
        description: this.productToEdit.description,
        imgUrl: this.productToEdit.imageUrl
      });
    }
  }

  updateProduct() {
    if (this.productToEdit) {
      const updatedProduct: Product = {
        ...this.productToEdit,
        Product_name: this.myForm.get('productName')?.value,
        price: this.myForm.get('price')?.value,
        Category_Id: this.myForm.get('categoryId')?.value,
        description: this.myForm.get('description')?.value,
        imageUrl: this.myForm.get('imgUrl')?.value,
        category: CATEGORIES[this.myForm.get('categoryId')?.value - 1]
      };

      this.productsService.updateProduct(updatedProduct);
      this.myForm.reset();
      alert("המוצר עודכן בהצלחה!");
    }
  }

  addProduct() {
    const newProduct: Product = new Product();
    const products = this.productsService.getProducts()();
    
    newProduct.Products_id = products.length > 0 ? Math.max(...products.map(p => p.Products_id)) + 1 : 1;
    newProduct.Product_name = this.myForm.get('productName')?.value;
    newProduct.price = this.myForm.get('price')?.value;
    newProduct.Category_Id = this.myForm.get('categoryId')?.value;
    newProduct.description = this.myForm.get('description')?.value;
    newProduct.imageUrl = this.myForm.get('imgUrl')?.value;
    newProduct.category = CATEGORIES[newProduct.Category_Id - 1];

    this.productsService.addProduct(newProduct);
    this.myForm.reset();
    alert("המוצר נוסף בהצלחה!");
  }
}
