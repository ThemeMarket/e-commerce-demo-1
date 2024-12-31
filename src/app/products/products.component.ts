import {
  Component,
  computed,
  effect,
  inject,
  input,
  OnInit,
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
import {
  getProductsOfTheCurrentPage,
  getTotalProductPages,
} from '../utils/pagination';
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
export class ProductsComponent implements OnInit {
  productService = inject(ProductService);
  router = inject(Router);

  rating = input<string>();
  minPrice = input<string>();
  maxPrice = input<string>();
  category = input<ProductCategory>();
  page = input<string>();
  sortBy = input<string>();
  searchTerm = input<string>();

  queryParams = computed(() => ({
    rating: this.rating() ? Number(this.rating()) : 5,
    minPrice: this.minPrice() ? Number(this.minPrice()) : 0,
    maxPrice: this.maxPrice() ? Number(this.maxPrice()) : 3500,
    category: this.category(),
    sortBy: this.sortBy(),
    searchTerm: this.searchTerm(),
    page: this.page() ? parseInt(this.page() as string) : 1,
  }));

  private readonly filteredProducts = computed(() =>
    this.productService.getByFilters(this.queryParams())
  );

  totalProductPages = computed(() =>
    this.filteredProducts().pipe(
      map((products) => getTotalProductPages(products))
    )
  );
  products!: Product[];

  constructor() {
    effect(() => {
      this.filteredProducts().subscribe((filteredProducts) => {
        const sortedProducts = this.productService.sortBy(
          filteredProducts,
          this.sortBy() ?? 'most-popular'
        );

        this.products = getProductsOfTheCurrentPage(
          sortedProducts,
          this.queryParams().page
        );
      });
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      initFlowbite();
    }, 100);
  }

  loadPage(page: number) {
    this.totalProductPages().subscribe((pages) => {
      if (!pages.includes(page)) return;

      this.router.navigate(['/products'], {
        queryParams: { page },
        queryParamsHandling: 'merge',
      });
    });
  }
}
