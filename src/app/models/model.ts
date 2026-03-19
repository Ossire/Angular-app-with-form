export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  rating: number;
  imageUrl: string;
  properties?: { color: string; weight: string }[];
}
