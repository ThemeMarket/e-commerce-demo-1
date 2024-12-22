import { Product } from './product';

interface CartProduct {
  product: Product;
  quantity: number;
}

export interface Cart extends Array<CartProduct> {}
