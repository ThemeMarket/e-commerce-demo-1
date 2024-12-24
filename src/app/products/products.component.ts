import {
  Component,
  computed,
  inject,
  input,
  OnChanges,
  OnInit,
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

  products = computed(() =>
    this.productService.getByFilters({
      category: this.selectedCategory(),
      rating: this.selectedRating(),
      minPrice: this.selectedMinPrice(),
      maxPrice: this.selectedMaxPrice(),
    })
  );
  productPages = computed(() =>
    this.products().pipe(map((products) => getProductPages(products)))
  );
  pageProducts!: Product[];

  ngOnChanges(changes: SimpleChanges): void {
    const { rating, minPrice, category, maxPrice, page, sortBy } = changes;

    if (rating || minPrice || category || maxPrice || page || sortBy) {
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
        },
      });
    });
  }
}
