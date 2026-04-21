export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  inStock: boolean;
  rating: number;
  imageUrl: string;
  properties?: { color: string; weight: string }[];
}

export interface Category {
  id: number;
  name: string;
}
