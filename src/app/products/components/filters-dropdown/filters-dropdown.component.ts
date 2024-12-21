import {
  Component,
  computed,
  inject,
  input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { ProductCategory } from '../../../shared/models/product';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-filters-dropdown',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './filters-dropdown.component.html',
})
export class FiltersDropdownComponent implements OnChanges {
  productService = inject(ProductService);

  selectedCategory = input<ProductCategory>();
  selectedRating = input<number>();
  selectedMinPrice = input<number>();
  selectedMaxPrice = input<number>();

  minPrice = signal<number>(0);
  maxPrice = signal<number>(3500);
  rating = signal<number>(5);
  category = signal<ProductCategory>(ProductCategory.ALL);

  results = computed(() =>
    this.productService
      .getByFilters({
        category: this.category(),
        rating: this.rating(),
        minPrice: this.minPrice(),
        maxPrice: this.maxPrice(),
      })
      .pipe(map((products) => products.length))
  );

  ngOnChanges(changes: SimpleChanges): void {
    const {
      selectedCategory,
      selectedMaxPrice,
      selectedMinPrice,
      selectedRating,
    } = changes;

    if (
      selectedCategory ||
      selectedMaxPrice ||
      selectedMinPrice ||
      selectedRating
    ) {
      this.setSelectedValues();
    }
  }

  updateMinPrice(e: Event) {
    const target = e.target as HTMLInputElement;
    this.minPrice.set(parseInt(target.value));
  }

  updateMaxPrice(e: Event) {
    const target = e.target as HTMLInputElement;
    this.maxPrice.set(parseInt(target.value));
  }

  updateRating(rating: number) {
    this.rating.set(rating);
  }

  updateCategory(category: string) {
    this.category.set(category as ProductCategory);
  }

  setSelectedValues() {
    const selectedCategory = this.selectedCategory() ?? ProductCategory.ALL;
    const selectedRating = this.selectedRating() ?? 5;
    const selectedMinPrice = this.selectedMinPrice() ?? 0;
    const selectedMaxPrice = this.selectedMaxPrice() ?? 3500;

    this.category.set(selectedCategory);
    this.rating.set(selectedRating);
    this.minPrice.set(selectedMinPrice);
    this.maxPrice.set(selectedMaxPrice);
  }
}
