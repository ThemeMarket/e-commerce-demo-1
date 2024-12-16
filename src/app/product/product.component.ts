import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Product } from '../shared/models/product';
import { PRODUCTS_MOCK } from '../mocks/products';
import { BaseLayoutComponent } from "../shared/components/base-layout/base-layout.component";

@Component({
  selector: 'app-product',
  imports: [BaseLayoutComponent],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  route = inject(ActivatedRoute);
  product?: Product;

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params: ParamMap) => {
        const id = params.get('id');

        if (id) {
          this.product = PRODUCTS_MOCK.find((product) => product.id === id);
        }
      },
    });
  }
}
