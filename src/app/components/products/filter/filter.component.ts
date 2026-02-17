import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      maxPrice: [250]
    });
  }

  apply() {
    this.filterChanged.emit(this.filterForm.value);
  }

  clear() {
    this.filterForm.patchValue({ maxPrice: 250 });
    this.filterChanged.emit(this.filterForm.value);
  }
}



