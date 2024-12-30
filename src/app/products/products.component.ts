import {
  Component,
  computed,
  EventEmitter,
  inject,
  input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ProductsLayoutComponent } from './components/products-layout/products-layout.component';
import { FiltersDropdownComponent } from './components/filters-dropdown/filters-dropdown.component';
import { ProductService } from '../core/services/product.service';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { Router, RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { Product, ProductCategory } from '../shared/models/product';
import { FormatCategoryPipe } from '../shared/pipes/format-category.pipe';
import { map } from 'rxjs';
import { getProductPages, MAX_PRODUCTS_PER_PAGE } from '../utils/pagination';
import { ProductLoadingComponent } from '../shared/components/product-loading/product-loading.component';

@Component({
  selector: 'app-products',
  imports: [
    ProductsLayoutComponent,
    FiltersDropdownComponent,
    ProductCardComponent,
    RouterLink,
    TitleCasePipe,
    FormatCategoryPipe,
    ProductLoadingComponent,
  ],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit, OnChanges {
  productService = inject(ProductService);
  router = inject(Router);

  rating = input<string>();
  minPrice = input<string>();
  maxPrice = input<string>();
  category = input<ProductCategory>();
  page = input<string>();
  sortBy = input<string>();

  @Output() searchTermChangeEvent: EventEmitter<string> = new EventEmitter();

  selectedRating = computed(() => (this.rating() ? Number(this.rating()) : 5));
  selectedMinPrice = computed(() =>
    this.minPrice() ? Number(this.minPrice()) : 0
  );
  selectedMaxPrice = computed(() =>
    this.maxPrice() ? Number(this.maxPrice()) : 3500
  );
  selectedCategory = computed(() => this.category());
  selectedPage = computed(() =>
    this.page() ? parseInt(this.page() as string) : 1
  );
  selectedSearchTerm = '';

  /**
   * Computed property que obtiene una lista de productos filtrados
   * según la categoría seleccionada, la calificación, el precio mínimo
   * y el precio máximo.
   *
   * @returns {Product[]} Lista de productos filtrados.
   */
  products = computed(() =>
    this.productService.getByFilters({
      category: this.selectedCategory(),
      rating: this.selectedRating(),
      minPrice: this.selectedMinPrice(),
      maxPrice: this.selectedMaxPrice(),
      searchTerm: this.selectedSearchTerm,
    })
  );
  productPages = computed(() =>
    this.products().pipe(map((products) => getProductPages(products)))
  );
  pageProducts!: Product[];

  /**
   * Responde a los cambios en las propiedades de entrada del componente.
   *
   * @param changes - Un objeto de pares clave-valor donde la clave es el nombre de la propiedad de entrada y el valor es una instancia de `SimpleChange`.
   *
   * Este método verifica si alguna de las siguientes propiedades de entrada ha cambiado: `rating`, `minPrice`, `category`, `maxPrice`, `page` o `sortBy`.
   * Si alguna de estas propiedades ha cambiado, obtiene la lista actualizada de productos, los ordena según la propiedad `sortBy` (por defecto 'most-popular' si `sortBy` no está proporcionado), y actualiza la propiedad `pageProducts` con los productos de la página actual.
   */
  ngOnChanges(changes: SimpleChanges): void {
    const { rating, minPrice, category, maxPrice, page, sortBy, searchTerm } =
      changes;

    if (
      rating ||
      minPrice ||
      category ||
      maxPrice ||
      page ||
      sortBy ||
      searchTerm
    ) {
      this.products().subscribe((products) => {
        const sortedProducts = this.productService.sortBy(
          products,
          this.sortBy() ?? 'most-popular'
        );

        this.pageProducts = this.getPageProducts(sortedProducts);
      });
    }
  }

  ngOnInit(): void {
    setTimeout(() => {
      initFlowbite();
    }, 100);

    this.updateProducts();
  }

  private getPageProducts(products: Product[]) {
    const currentPage = this.page() ? parseInt(this.page() as string) : 1;
    const lastIndex = currentPage * MAX_PRODUCTS_PER_PAGE;
    const initialIndex = lastIndex - MAX_PRODUCTS_PER_PAGE;
    const pageProducts = [];

    for (let i = 0; i < MAX_PRODUCTS_PER_PAGE; i++) {
      const product = products[i + initialIndex];

      if (product) pageProducts.push(product);
    }

    return pageProducts;
  }

  loadPage(page: number) {
    this.productPages().subscribe((pages) => {
      if (!pages.includes(page)) return;

      this.router.navigate(['/products'], {
        queryParams: {
          category: this.selectedCategory(),
          rating: this.selectedRating(),
          minPrice: this.selectedMinPrice(),
          maxPrice: this.selectedMaxPrice(),
          sortBy: this.sortBy(),
          page,
          searchTerm: this.selectedSearchTerm,
        },
      });
    });
    this.updateProducts();
  }

  /**
   * Maneja el cambio del término de búsqueda.
   * Actualiza el término de búsqueda seleccionado, emite el evento de cambio de término de búsqueda,
   * y recarga la primera página de la lista de productos.
   *
   * @param newSearchTerm - El nuevo término de búsqueda ingresado por el usuario.
   */
  onSearchTermChange(newSearchTerm: string) {
    this.selectedSearchTerm = newSearchTerm;
    this.searchTermChangeEvent.emit(newSearchTerm);
    this.loadPage(1);
  }

  /**
   * Actualiza la lista de productos según los filtros seleccionados y los criterios de ordenación.
   *
   * Este método obtiene productos del servicio de productos utilizando los filtros actualmente seleccionados
   * para categoría, calificación, precio mínimo, precio máximo y término de búsqueda. Luego,
   * ordena los productos obtenidos según los criterios de ordenación seleccionados (por defecto
   * 'más-populares' si no se selecciona ningún criterio de ordenación). Finalmente, actualiza la
   * propiedad `pageProducts` con los productos ordenados y paginados.
   *
   * @returns {void}
   */
  updateProducts() {
    this.productService
      .getByFilters({
        category: this.selectedCategory(),
        rating: this.selectedRating(),
        minPrice: this.selectedMinPrice(),
        maxPrice: this.selectedMaxPrice(),
        searchTerm: this.selectedSearchTerm,
      })
      .subscribe((products) => {
        const sortedProducts = this.productService.sortBy(
          products,
          this.sortBy() ?? 'most-popular'
        );
        this.pageProducts = this.getPageProducts(sortedProducts);
      });
  }
}
