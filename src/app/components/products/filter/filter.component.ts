import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { CATEGORIES } from '../../../models/categories.const';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {

  @Output() filterChanged = new EventEmitter<any>();

  filterForm: FormGroup;

  ngOnInit() {
    this.filterForm.valueChanges.subscribe(value => {
      this.filterChanged.emit(value);
    });
  }

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      name: [''],
      description: [''],
      maxPrice: [250],
      categories: this.fb.array([])   // 👈 important
    });
  }

  get categoriesFormArray() {
    return this.filterForm.get('categories') as FormArray;
  }

  onCategoryChange(event: any) {
    if (event.target.checked) {
      this.categoriesFormArray.push(this.fb.control(event.target.value));
    } else {
      const index = this.categoriesFormArray.controls
        .findIndex((x: any) => x.value === event.target.value);
      this.categoriesFormArray.removeAt(index);
    }
  }

  apply() {
    this.filterChanged.emit(this.filterForm.value);
  }

  clear() {
    this.filterForm.reset({
      name: '',
      description: '',
      maxPrice: 250,
      categories: []
    });

    this.filterChanged.emit(this.filterForm.value);
  }


  categoriesList: string[] = [
    ...CATEGORIES
  ];


}



