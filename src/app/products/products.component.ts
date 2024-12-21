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
import { FiltersModalComponent } from './components/filters-modal/filters-modal.component';
import { ProductService } from '../core/services/product.service';
import { ProductCardComponent } from '../shared/components/product-card/product-card.component';
import { Router, RouterLink } from '@angular/router';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Product, ProductCategory } from '../shared/models/product';
import { FormatCategoryPipe } from '../shared/pipes/format-category.pipe';
import { map, Observable } from 'rxjs';
import { getProductPages, MAX_PRODUCTS_PER_PAGE } from '../utils/pagination';

@Component({
  selector: 'app-products',
  imports: [
    ProductsLayoutComponent,
    FiltersModalComponent,
    ProductCardComponent,
    RouterLink,
    TitleCasePipe,
    FormatCategoryPipe,
    AsyncPipe,
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
  pageProducts!: Observable<Product[]>;

  ngOnChanges(changes: SimpleChanges): void {
    const { page } = changes;

    if (page) {
      this.pageProducts = this.getPageProducts();
    }
  }

  ngOnInit(): void {
    this.pageProducts = this.getPageProducts();

    setTimeout(() => {
      initFlowbite();
    }, 100);
  }

  private getPageProducts() {
    return this.products().pipe(
      map((products) => {
        const currentPage = this.page() ? parseInt(this.page() as string) : 1;
        const lastIndex = currentPage * MAX_PRODUCTS_PER_PAGE;
        const initialIndex = lastIndex - MAX_PRODUCTS_PER_PAGE;
        const pageProducts = [];

        for (let i = 0; i < MAX_PRODUCTS_PER_PAGE; i++) {
          const product = products[i + initialIndex];

          if (product) pageProducts.push(product);
        }

        return pageProducts;
      })
    );
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
          page,
        },
      });
    });
  }
}
