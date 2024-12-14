import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { initFlowbite } from 'flowbite';
import { ProductOfferComponent } from '../shared/components/product-offer/product-offer.component';
import { Product } from '../shared/models/product';
import { PRODUCTS_MOCK } from '../mocks/products';
import { CATEGORY_MOCK } from '../mocks/category';
import { PROMO_MOCK } from '../mocks/promo';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    FooterComponent,
    ProductOfferComponent,
    ProductCardComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  productsOffers: Product[] = PRODUCTS_MOCK;
  categories = CATEGORY_MOCK;
  promos = PROMO_MOCK;

  ngOnInit(): void {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }
}
