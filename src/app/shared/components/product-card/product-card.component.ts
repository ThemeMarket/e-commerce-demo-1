import { Component, computed, input, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CurrencyPipe, NgOptimizedImage, PercentPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RatingPipe } from '../../pipes/rating.pipe';
import { Cart } from '../../models/cart';
import { initTooltips } from 'flowbite';

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
  productDiscount = computed(() => {
    const currentPrice = this.product().price;
    const previousPrice = this.product().previousPrice;

    if (previousPrice) {
      return (previousPrice - currentPrice) / previousPrice;
    }

    return null;
  });

  productTooltipId = crypto.randomUUID();

  addToCart() {
    const cart: Cart = JSON.parse(localStorage.getItem('cart') as string) || [];

    const matched = cart.find(
      ({ product }) => product.id === this.product().id
    );

    if (matched) {
      matched.quantity++;
    } else {
      cart.push({ product: this.product(), quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  ngOnInit(): void {
    initTooltips();
  }
}
