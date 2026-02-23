import { Component } from '@angular/core';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ProductEditComponent, ProductFormComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
