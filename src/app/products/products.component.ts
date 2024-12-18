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
  rating = input<number>();
  minPrice = input<number>();
  maxPrice = input<number>();
  category = input<ProductCategory>();

  formattedCategory = computed(() =>
    this.category()
      ?.split('-')
      .reduce((acc: string, val: string) => acc + ' ' + val, '')
  );

  productService = inject(ProductService);
  products = computed(() =>
    this.productService.filter({
      category: this.category(),
      rating: this.rating(),
      minPrice: this.minPrice(),
      maxPrice: this.maxPrice(),
    })
  );

  ngOnInit(): void {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }
}
