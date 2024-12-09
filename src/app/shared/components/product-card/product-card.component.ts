import { Component, input } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, NgOptimizedImage, RouterLink],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  product = input.required<Product>();
}
