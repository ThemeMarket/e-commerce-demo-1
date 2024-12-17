import { Component, inject, input, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProductsLayoutComponent } from './components/products-layout/products-layout.component';
import { FiltersModalComponent } from './components/filters-modal/filters-modal.component';
import { ProductService } from '../core/services/product.service';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

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
  productService = inject(ProductService);
  category = input<string>('');
  products = this.productService.getAll();

  ngOnInit(): void {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }
}
