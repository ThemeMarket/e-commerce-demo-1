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
  searchTerm?: string;
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

  /**
   * Filtra la lista de productos según las opciones de filtro proporcionadas.
   *
   * @param {ProductFilterOptions} filters - Las opciones de filtro a aplicar.
   * @param {string} [filters.category] - La categoría por la cual filtrar.
   * @param {number} [filters.minPrice] - El precio mínimo por el cual filtrar.
   * @param {number} [filters.maxPrice] - El precio máximo por el cual filtrar.
   * @param {number} [filters.rating] - La calificación máxima por la cual filtrar.
   * @param {string} [filters.searchTerm] - El término de búsqueda por el cual filtrar, que se compara con el nombre y la descripción del producto.
   * @returns {Observable<Product[]>} Un observable de la lista filtrada de productos.
   */
  getByFilters(filters: ProductFilterOptions): Observable<Product[]> {
    const { category, minPrice, maxPrice, rating, searchTerm } = filters;

    const filteredProducts = this.products.filter((product) => {
      let matched = true;

      if (category && product.category !== category) matched = false;
      if (minPrice && product.price < minPrice) matched = false;
      if (maxPrice !== undefined && product.price > maxPrice) matched = false;
      if (rating && product.rating > rating) matched = false;
      if (
        searchTerm &&
        !product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        matched = false;
      }

      return matched;
    });
    return of(filteredProducts);
  }

  sortBy(products: Product[], strategy: string): Product[] {
    const sortStrategy = this.sortProductsStrategyFactory.getStrategy(strategy);
    return sortStrategy.sort(products);
  }
}
