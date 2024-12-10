import { Component, input } from '@angular/core';
import { Product } from '../../models/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-offer',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-offer.component.html',
})
export class ProductOfferComponent {
  product = input.required<Product>();
}
