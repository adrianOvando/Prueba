export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviewsCount: number;
  stock: number;
  tag?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
