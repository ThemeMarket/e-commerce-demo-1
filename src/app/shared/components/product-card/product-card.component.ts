import { Component, input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, NgOptimizedImage, PercentPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RatingPipe } from '../../pipes/rating.pipe';

@Component({
  selector: 'app-product-card',
  imports: [
    CurrencyPipe,
    NgOptimizedImage,
    RouterLink,
    PercentPipe,
    RatingPipe,
  ],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent implements OnInit {
  product = input.required<Product>();
  productDiscount?: number;

  ngOnInit(): void {
    const currentPrice = this.product().price;
    const previousPrice = this.product().previousPrice;

    if (previousPrice) {
      this.productDiscount = (previousPrice - currentPrice) / previousPrice;
    }
  }
}
