export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  inStock: boolean;
  rating: number;
  imageUrl: string;
  properties?: { color: string; weight: string }[];
}
