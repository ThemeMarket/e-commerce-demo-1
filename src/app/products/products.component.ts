import { Component, computed, inject, input, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProductsLayoutComponent } from './components/products-layout/products-layout.component';
import { FiltersModalComponent } from './components/filters-modal/filters-modal.component';
import { ProductService } from '../core/services/product.service';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { ProductCategory } from '../shared/models/product';

@Component({
  selector: 'app-products',
  imports: [
    ProductsLayoutComponent,
    FiltersModalComponent,
    ProductCardComponent,
    RouterLink,
    TitleCasePipe,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  rating = input<string>();
  minPrice = input<string>();
  maxPrice = input<string>();
  category = input<ProductCategory>();
  page = input<string>();

  selectedRating = computed(() => Number(this.rating()));
  selectedMinPrice = computed(() => Number(this.minPrice()));
  selectedMaxPrice = computed(() => Number(this.maxPrice()));
  selectedCategory = computed(() => this.category());

  formattedCategory = computed(() =>
    this.category()
      ?.split('-')
      .reduce((acc: string, val: string) => acc + ' ' + val, '')
  );

  productService = inject(ProductService);
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
