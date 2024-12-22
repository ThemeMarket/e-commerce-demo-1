import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProductOfferComponent } from '../shared/components/product-offer/product-offer.component';
import { Product } from '../shared/models/product';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { BaseLayoutComponent } from '../shared/components/base-layout/base-layout.component';
import { ProductService } from '../core/services/product.service';
import { ProductLoadingComponent } from '../shared/components/product-loading/product-loading.component';
import { MAX_PRODUCTS_PER_PAGE } from '../utils/pagination';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    ProductOfferComponent,
    ProductCardComponent,
    BaseLayoutComponent,
    ProductLoadingComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);

  products!: Product[];
  productsOffers!: Product[];

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products.filter(
        (_, index) => index < MAX_PRODUCTS_PER_PAGE
      );
      this.productsOffers = products.filter((product) => product.previousPrice);

      setTimeout(() => {
        initFlowbite();
      }, 100);
    });
  }
}
