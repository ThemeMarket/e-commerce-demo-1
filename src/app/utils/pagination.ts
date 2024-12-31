import { Product } from '../shared/models/product';

export const MAX_PRODUCTS_PER_PAGE = 8;

export function getTotalProductPages(arr: any[]): number[] {
  const pages: number[] = [];
  const length = arr.length / MAX_PRODUCTS_PER_PAGE;

  for (let i = 0; i < length; i++) {
    pages.push(i + 1);
  }

  return pages;
}

export function getProductsOfTheCurrentPage(
  totalProducts: Product[],
  currentPage: number
): Product[] {
  const initialIndex =
    currentPage * MAX_PRODUCTS_PER_PAGE - MAX_PRODUCTS_PER_PAGE;
  const pageProducts = [];

  for (let i = 0; i < MAX_PRODUCTS_PER_PAGE; i++) {
    const product = totalProducts[i + initialIndex];

    if (product) pageProducts.push(product);
  }

  return pageProducts;
}
