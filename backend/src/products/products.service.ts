import { Injectable, NotFoundException } from '@nestjs/common';
import { Product, CreateOrderDto } from './product.interface';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Auriculares Inalámbricos Pro ANC',
      description: 'Cancelación activa de ruido híbrida, sonido Hi-Res y batería de 40 horas.',
      price: 129.99,
      originalPrice: 179.99,
      category: 'Audio',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      rating: 4.8,
      reviewsCount: 142,
      stock: 25,
      tag: 'Oferta',
    },
    {
      id: '2',
      name: 'Smartwatch Ultra AMOLED 49mm',
      description: 'Sensor de oxígeno, monitor cardíaco, GPS doble frecuencia y resistencia al agua 50m.',
      price: 249.00,
      originalPrice: 299.00,
      category: 'Smartwatches',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80',
      rating: 4.9,
      reviewsCount: 89,
      stock: 15,
      tag: 'Más vendido',
    },
    {
      id: '3',
      name: 'Cámara Mirrorless 4K Creator Kit',
      description: 'Sensor APS-C 24.2 MP, grabación de vídeo en 4K/60fps y lente 18-55mm incluida.',
      price: 799.00,
      category: 'Fotografía',
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80',
      rating: 4.7,
      reviewsCount: 56,
      stock: 8,
      tag: 'Nuevo',
    },
    {
      id: '4',
      name: 'Teclado Mecánico RGB Switch Brown',
      description: 'Switches táctiles silenciosos, retroiluminación RGB por tecla y cuerpo de aluminio.',
      price: 89.50,
      originalPrice: 110.00,
      category: 'Accesorios',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      rating: 4.6,
      reviewsCount: 210,
      stock: 40,
    },
    {
      id: '5',
      name: 'Laptop Ultrabook Slim 14" M3',
      description: 'Pantalla Liquid Retina, 16GB RAM unificada, 512GB SSD NVMe ultrarrápido.',
      price: 1199.99,
      originalPrice: 1349.00,
      category: 'Laptops',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80',
      rating: 4.9,
      reviewsCount: 312,
      stock: 12,
      tag: 'Top Rendimiento',
    },
    {
      id: '6',
      name: 'Altavoz Portátil Bluetooth 360 Waterproof',
      description: 'Graves profundos, certificación IPX7 contra agua y polvo, hasta 24h de reproducción.',
      price: 69.99,
      category: 'Audio',
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      rating: 4.5,
      reviewsCount: 77,
      stock: 30,
    },
    {
      id: '7',
      name: 'Smartphone Pro 5G 256GB',
      description: 'Pantalla OLED 120Hz, cámara triple de 108MP con zoom óptico 5x y carga de 67W.',
      price: 689.00,
      originalPrice: 750.00,
      category: 'Smartphones',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      rating: 4.8,
      reviewsCount: 198,
      stock: 18,
      tag: 'Oferta',
    },
    {
      id: '8',
      name: 'Mouse Ergonómico Inalámbrico Precision',
      description: 'Sensor óptico de 4000 DPI, scroll hiperrápido multidireccional y carga USB-C.',
      price: 54.00,
      category: 'Accesorios',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
      rating: 4.7,
      reviewsCount: 164,
      stock: 55,
    },
  ];

  findAll(category?: string, search?: string): Product[] {
    let result = [...this.products];

    if (category && category !== 'Todos') {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase(),
      );
    }

    if (search) {
      const term = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term),
      );
    }

    return result;
  }

  findOne(id: string): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    return product;
  }

  getCategories(): string[] {
    const categories = Array.from(new Set(this.products.map((p) => p.category)));
    return ['Todos', ...categories];
  }

  createOrder(orderDto: CreateOrderDto) {
    const orderId = 'ORD-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    const total = orderDto.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      success: true,
      message: '¡Pedido realizado con éxito!',
      orderId,
      total: Number(total.toFixed(2)),
      itemsCount: orderDto.items.reduce((sum, item) => sum + item.quantity, 0),
      createdAt: new Date().toISOString(),
    };
  }
}
