import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { ProductCategory } from '../../../shared/models/product';
import { map, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-filters-dropdown',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './filters-dropdown.component.html',
})
export class FiltersDropdownComponent implements OnInit {
  productService = inject(ProductService);
  route = inject(ActivatedRoute);

  minPrice = signal<number>(0);
  maxPrice = signal<number>(3500);
  rating = signal<number>(5);
  category = signal<ProductCategory>(ProductCategory.ALL);

  results!: Observable<number>;

  constructor() {
    effect(() => {
      this.results = this.productService
        .getByFilters({
          category: this.category(),
          minPrice: this.minPrice(),
          maxPrice: this.maxPrice(),
          rating: this.rating(),
        })
        .pipe(map((products) => products.length));
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const { minPrice, maxPrice, rating, category } = params;

      this.minPrice.set(minPrice ? Number(minPrice) : 0);
      this.maxPrice.set(maxPrice ? Number(maxPrice) : 3500);
      this.rating.set(rating ? Number(rating) : 5);
      this.category.set(category ? category : ProductCategory.ALL);
    });
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
}
