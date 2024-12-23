import {
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { Product } from '../shared/models/product';
import { BaseLayoutComponent } from '../shared/components/base-layout/base-layout.component';
import { ProductService } from '../core/services/product.service';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Cart } from '../shared/models/cart';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-product',
  imports: [BaseLayoutComponent, NgOptimizedImage, CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  id = input<string>('');

  productService = inject(ProductService);
  product?: Product;

  activeImgSrc = signal<string>('');
  productImg = viewChild<ElementRef<HTMLImageElement>>('productImg');

  ngOnInit(): void {
    this.productService.getById(this.id()).subscribe((product) => {
      this.product = product;
      this.changeActiveImg(this.product?.images[0] as string);
    });

    initFlowbite();
  }

  addToCart() {
    const cart: Cart = JSON.parse(localStorage.getItem('cart') as string) || [];

    const matched = cart.find(({ product }) => product.id === this.product?.id);

    if (matched) {
      matched.quantity++;
    } else {
      cart.push({ product: this.product!, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    // TODO: notify the event to the user with a toast
  }

  changeActiveImg(src: string) {
    this.activeImgSrc.set(src);

    const productImgElement = this.productImg()?.nativeElement;

    if (productImgElement) {
      productImgElement.classList.toggle('animate-slideOut');

      setTimeout(() => {
        productImgElement.classList.toggle('animate-slideOut');
        productImgElement.classList.add('animate-slideIn');
      }, 250);
    }
  }
}
