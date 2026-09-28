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

export interface CreateOrderDto {
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  customerName?: string;
  customerEmail?: string;
  address?: string;
}
