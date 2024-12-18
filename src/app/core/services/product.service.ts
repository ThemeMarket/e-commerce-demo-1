import { Injectable } from '@angular/core';
import { Product, ProductCategory } from '../../shared/models/product';
import { PRODUCTS_MOCK } from '../../mocks/products';

interface ProductFilterOptions {
  maxPrice?: number;
  minPrice?: number;
  category?: ProductCategory;
  rating?: number;
}

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

  filter(filters: ProductFilterOptions): Product[] {
    const { category, minPrice, maxPrice, rating } = filters;

    return this.products.filter((product) => {
      let matched = true;

      if (category && product.category !== category) matched = false;
      if (minPrice && product.price < minPrice) matched = false;
      if (maxPrice && product.price > maxPrice) matched = false;
      if (rating && product.rating > rating) matched = false;

      return matched;
    });
  }
}
