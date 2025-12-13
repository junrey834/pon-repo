export type ProductSize = 'S' | 'M' | 'L' | 'XL';

export type ProductCategory = 'hoodie' | 'jacket';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: ProductCategory;
  sizes: ProductSize[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}
