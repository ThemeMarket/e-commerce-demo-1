export interface Product {
  id: string;
  name: string;
  urlImg: string;
  description: string;
  previousPrice: number | null;
  price: number;
  reviews: number;
}
