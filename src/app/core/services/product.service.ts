import { inject, Injectable } from '@angular/core';
import { Product, ProductCategory } from '../../shared/models/product';
import { PRODUCTS_MOCK } from '../../mocks/products';
import { Observable, of } from 'rxjs';
import { SortProductsStrategyFactory } from '../../utils/sortStrategy';

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
  sortProductsStrategyFactory = inject(SortProductsStrategyFactory);

  products: Product[] = PRODUCTS_MOCK;

  getAll(): Observable<Product[]> {
    return of(this.products);
  }

  getById(id: string): Observable<Product | undefined> {
    const product = this.products.find((product) => product.id === id);
    return of(product);
  }

  getByFilters(filters: ProductFilterOptions): Observable<Product[]> {
    const { category, minPrice, maxPrice, rating } = filters;

    const filteredProducts = this.products.filter((product) => {
      let matched = true;

      if (category && product.category !== category) matched = false;
      if (minPrice && product.price < minPrice) matched = false;
      if (maxPrice && product.price > maxPrice) matched = false;
      if (rating && product.rating > rating) matched = false;

      return matched;
    });

    return of(filteredProducts);
  }

  sortBy(products: Product[], strategy: string): Product[] {
    const sortStrategy = this.sortProductsStrategyFactory.getStrategy(strategy);
    return sortStrategy.sort(products);
  }
}
