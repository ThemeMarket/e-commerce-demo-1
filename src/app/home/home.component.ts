import { Component, inject, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProductOfferComponent } from '../shared/components/product-offer/product-offer.component';
import { Product } from '../shared/models/product';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { BaseLayoutComponent } from '../shared/components/base-layout/base-layout.component';
import { ProductService } from '../core/services/product.service';
import { CategoryService } from '../core/services/category.service';
import { Category } from '../shared/models/category';
import { Promo } from '../shared/models/promo';
import { PromoService } from '../core/services/promo.service';
import { ProductLoadingComponent } from "../shared/components/product-loading/product-loading.component";

@Component({
  selector: 'app-home',
  imports: [ProductOfferComponent, ProductCardComponent, BaseLayoutComponent, ProductLoadingComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  promoService = inject(PromoService);

  products!: Product[];
  productsOffers!: Product[];
  categories: Category[] = this.categoryService.getAll();
  promos: Promo[] = this.promoService.getAll();

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
      this.productsOffers = products.filter((p) => p.previousPrice);

      setTimeout(() => {
        initFlowbite();
      }, 100);
    });
  }
}
