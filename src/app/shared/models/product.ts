export enum ProductCategory {
  HEADPHONES = 'headphones',
  WATCHES = 'watches',
  PHONES = 'phones',
  CLOTHES = 'clothes',
  CONSOLES = 'consoles',
  GIFT_CARDS = 'gift-cards',
  LAPTOPS = 'laptops',
  TVS = 'tvs',
  PCS = 'PCs',
  ALL = '',
}

export interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
  previousPrice: number | null;
  price: number;
  reviews: number;
  category: ProductCategory;
  rating: number;
}
