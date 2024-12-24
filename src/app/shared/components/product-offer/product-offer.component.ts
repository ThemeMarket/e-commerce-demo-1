import { Component, input } from '@angular/core';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-offer',
  imports: [RouterLink, CurrencyPipe, NgOptimizedImage],
  templateUrl: './product-offer.component.html',
})
export class ProductOfferComponent {
  product = input.required<Product>();
}
