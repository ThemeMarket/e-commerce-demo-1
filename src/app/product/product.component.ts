import { Component, inject, input, OnInit } from '@angular/core';
import { Product } from '../shared/models/product';
import { BaseLayoutComponent } from '../shared/components/base-layout/base-layout.component';
import { ProductService } from '../core/services/product.service';

@Component({
  selector: 'app-product',
  imports: [BaseLayoutComponent],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  id = input<string>('');

  productService = inject(ProductService);
  product?: Product;

  ngOnInit(): void {
    this.productService.getById(this.id()).subscribe((product) => {
      this.product = product;
    });
  }
}
