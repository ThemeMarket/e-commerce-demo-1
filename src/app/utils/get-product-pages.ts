export const MAX_PRODUCTS_PER_PAGE = 8;

export function getProductPages(arr: any[]): number[] {
  const pages: number[] = [];
  const length = arr.length / MAX_PRODUCTS_PER_PAGE;

  for (let i = 0; i < length; i++) {
    pages.push(i + 1);
  }

  return pages;
}
