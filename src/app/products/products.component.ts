import { Component, computed, inject, input, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProductsLayoutComponent } from './components/products-layout/products-layout.component';
import { FiltersModalComponent } from './components/filters-modal/filters-modal.component';
import { ProductService } from '../core/services/product.service';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { ProductCategory } from '../shared/models/product';
import { FormatCategoryPipe } from '../shared/pipes/format-category.pipe';

@Component({
  selector: 'app-products',
  imports: [
    ProductsLayoutComponent,
    FiltersModalComponent,
    ProductCardComponent,
    RouterLink,
    TitleCasePipe,
    FormatCategoryPipe,
    AsyncPipe,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['../shared/styles/pagination.css'],
})
export class ProductsComponent implements OnInit {
  productService = inject(ProductService);

  rating = input<string>();
  minPrice = input<string>();
  maxPrice = input<string>();
  category = input<ProductCategory>();
  page = input<string>();

  selectedRating = computed(() => Number(this.rating()));
  selectedMinPrice = computed(() => Number(this.minPrice()));
  selectedMaxPrice = computed(() => Number(this.maxPrice()));
  selectedCategory = computed(() => this.category());

  products = computed(() =>
    this.productService.getByFilters({
      category: this.selectedCategory(),
      rating: this.selectedRating(),
      minPrice: this.selectedMinPrice(),
      maxPrice: this.selectedMaxPrice(),
    })
  );

  ngOnInit(): void {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }
}
