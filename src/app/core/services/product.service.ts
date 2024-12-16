import { Injectable } from '@angular/core';
import { Product } from '../../shared/models/product';
import { PRODUCTS_MOCK } from '../../mocks/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = PRODUCTS_MOCK;

  getAll(): Product[] {
    return this.products;
  }

  getById(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}
