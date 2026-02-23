import { Component, effect, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service';
import { CardModule } from 'primeng/card';
import { ButtonModule, } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { addOrEdit } from '../../models/addOrEditEnum.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BasketServiceService } from '../../service/basket-service.service';
import { Product } from '../../models/products.model';
import { FilterComponent } from './filter/filter.component';
import { CATEGORIES } from '../../models/categories.const';
import { CategoryService } from '../../service/category.service';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardModule, ButtonModule, FormsModule, CommonModule, RouterModule, FilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  private productService = inject(ProductsService);
  private basketService = inject(BasketServiceService);
  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);
  addOrEditVal: addOrEdit = 0;

  allProducts = this.productService.getProducts();
  filteredProducts: Product[] = [];
  private activeFilter: any = null;
  urlCategories: string[] = [];  // category names for FilterComponent checkboxes
  private urlCategoryIds: number[] = [];  // category IDs for filtering

  private categoriesSignal = this.categoryService.getCategories();

  constructor() {
    // Re-filter when products load from API
    effect(() => {
      const products = this.allProducts();
      if (!this.activeFilter) {
        this.filteredProducts = [...products];
      } else {
        this.filteredProducts = this.filterProducts(products, this.activeFilter);
      }
    });

    // Resolve category names for FilterComponent once categories load from API
    effect(() => {
      const allCats = this.categoriesSignal();
      if (this.urlCategoryIds.length > 0 && allCats.length > 0) {
        this.urlCategories = allCats
          .filter(c => this.urlCategoryIds.includes(c.Category_Id))
          .map(c => c.Category_name);
      }
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const categoryIdParam = params['categoryId'];
      if (categoryIdParam) {
        this.urlCategoryIds = categoryIdParam.split(',').map((id: string) => +id.trim());
        this.activeFilter = { categoryIds: this.urlCategoryIds };
        this.filteredProducts = this.filterProducts(this.allProducts(), this.activeFilter);
      } else {
        this.urlCategoryIds = [];
        this.urlCategories = [];
        this.resetProducts();
      }
    });
  }


  refresh() {
    this.filteredProducts = [...this.allProducts()];
  }

  private filterProducts(products: Product[], filter: any): Product[] {
    const searchName = (filter.name || '').toLowerCase().trim();
    const searchDescription = (filter.description || '').toLowerCase().trim();
    const categories = filter.categories || [];
    const categoryIds: number[] = filter.categoryIds || [];

    return products.filter(product => {
      const productName = (product.Product_name || '').toLowerCase();
      const productDescription = (product.description || '').toLowerCase();
      const productCategoryName = product.category_name || CATEGORIES[(product.category_Id ?? 1) - 1];

      const matchesCategoryIds = categoryIds.length === 0 || categoryIds.includes(product.category_Id);
      const matchesCategoryNames = categories.length === 0 || categories.includes(productCategoryName);

      return (
        matchesCategoryIds &&
        matchesCategoryNames &&
        (searchName === '' || productName.includes(searchName)) &&
        (searchDescription === '' || productDescription.includes(searchDescription)) &&
        (filter.maxPrice == null || product.price <= filter.maxPrice)
      );
    });
  }

  onFilterChanged(filter: any) {
    // Always merge the locked URL category IDs into the sidebar filter
    const mergedFilter = { ...filter, categoryIds: this.urlCategoryIds };

    const isEmpty =
      !filter.name &&
      !filter.description &&
      (!filter.categories || filter.categories.length === 0) &&
      (filter.maxPrice === undefined || filter.maxPrice === 250);

    if (isEmpty && this.urlCategoryIds.length === 0) {
      this.resetProducts();
      return;
    }

    this.activeFilter = mergedFilter;
    this.filteredProducts = this.filterProducts(this.allProducts(), mergedFilter);
  }


  resetProducts() {
    // If we navigated from a category, reset back to that category only
    if (this.urlCategoryIds.length > 0) {
      this.activeFilter = { categoryIds: this.urlCategoryIds };
      this.filteredProducts = this.filterProducts(this.allProducts(), this.activeFilter);
    } else {
      this.activeFilter = null;
      this.filteredProducts = [...this.allProducts()];
    }
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
