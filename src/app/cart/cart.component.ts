import { Component, computed, OnInit, signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { BaseLayoutComponent } from '../shared/components/base-layout/base-layout.component';
import { CartProductLoadingComponent } from './components/cart-product-loading/cart-product-loading.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { Cart } from '../shared/models/cart';
import { RouterLink } from '@angular/router';
import { DiscountCode } from '../shared/models/discount-code';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { OrderSummary } from '../shared/models/order-summary';

@Component({
  selector: 'app-cart',
  imports: [
    BaseLayoutComponent,
    CartProductLoadingComponent,
    CartProductComponent,
    RouterLink,
    FormsModule,
    CurrencyPipe,
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['../shared/styles/forms.css'],
})
export class CartComponent implements OnInit {
  cart: Cart = [];
  orderSummary = signal<OrderSummary>({
    savings: 0,
    originalPrice: 0,
  });

  discountCodes: DiscountCode[] = [{ code: 'abc123', percent: 10 }];
  discountCode: string = '';

  total = computed(
    () => this.orderSummary().originalPrice - this.orderSummary().savings
  );

  ngOnInit(): void {
    this.updateCart();

    initFlowbite();
  }

  updateCart() {
    this.cart = JSON.parse(localStorage.getItem('cart') as string) || [];

    const originalPrice = this.cart.reduce(
      (acc, { product, quantity }) => acc + product.price * quantity,
      0
    );

    this.orderSummary.update((orderSummary) => {
      return {
        ...orderSummary,
        originalPrice,
      };
    });
  }

  applyDiscount() {
    const discount = this.discountCodes.find(
      ({ code }) => code == this.discountCode
    );

    if (discount) {
      const savings =
        (this.orderSummary().originalPrice * discount.percent) / 100;

      this.orderSummary.update((orderSummary) => {
        return { ...orderSummary, savings };
      });
    } else {
      // TODO: notify invalid code
    }
  }
}
