import { CommonModule } from '@angular/common';
import { Component, Input, NgModule, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { addOrEdit } from '../../models/addOrEditEnum.model';
import { Product } from '../../models/products.model';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CardModule, ButtonModule, DialogModule, CommonModule, FormsModule, DialogModule, InputTextModule, ReactiveFormsModule, InputNumberModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {

  @Input() addOrEditVal!: addOrEdit;
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required]],
      categoryId: ['', [Validators.required, Validators.maxLength(6)]],
      description: ['', [Validators.required]],
      imgUrl: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.addOrEditValue();
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form Submitted:', this.myForm.value);
    }
  }

  showDialogSignal = signal<boolean>(false);
  addOrEditSignal = signal<boolean>(false);
  addOrEditMessageSignal = signal<string>("");

  showDialog(flag: boolean) {
    this.showDialogSignal.set(flag);
    return this.showDialogSignal.asReadonly();
  }

  addOrEditValue() {
    console.log(this.addOrEditVal);

    if (this.addOrEditVal == 0) {
      this.addOrEditMessageSignal.set(" הוסף מוצר");
    }
    if (this.addOrEditVal == 1) {
      this.addOrEditMessageSignal.set(" ערוך מוצר");
    }
  }

  addProduct(form: NgForm) {
    const p: Product = new Product();
    //p.Description = form.get("")
  }
}
