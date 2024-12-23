import { Component, input, output } from '@angular/core';
import { Product } from '../../../shared/models/product';
import { Cart } from '../../../shared/models/cart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-product',
  imports: [CurrencyPipe],
  templateUrl: './cart-product.component.html',
})
export class CartProductComponent {
  product = input.required<Product>();
  quantity = input.required<number>();
  productUpdatedEvent = output<void>();

  updateQuantity(quantity: number) {
    if (quantity < 1) return;

    const cart: Cart = JSON.parse(localStorage.getItem('cart') as string);
    const filteredCart = cart.filter(
      ({ product }) => product.id !== this.product().id
    );

    filteredCart.push({
      product: this.product(),
      quantity: quantity,
    });

    localStorage.setItem('cart', JSON.stringify(filteredCart));
    this.productUpdatedEvent.emit();
  }

  remove() {
    const cart: Cart = JSON.parse(localStorage.getItem('cart') as string);
    const filteredCart = cart.filter(
      ({ product }) => product.id !== this.product().id
    );

    localStorage.setItem('cart', JSON.stringify(filteredCart));
    this.productUpdatedEvent.emit();
  }
}
