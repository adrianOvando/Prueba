'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProductCard } from '@/components/ProductCard';
import { CartDrawer } from '@/components/CartDrawer';
import { Product, CartItem } from '@/types/product';
import { Loader2, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';

const FALLBACK_PRODUCTS: Product[] = [
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
    price: 249.0,
    originalPrice: 299.0,
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
    price: 799.0,
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
    price: 89.5,
    originalPrice: 110.0,
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
    originalPrice: 1349.0,
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
];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(['Todos']);
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Fetch products from NestJS backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/products');
      if (!res.ok) throw new Error('Error al conectar con la API');
      const data = await res.json();
      setProducts(data);
      setIsBackendConnected(true);

      // Fetch categories
      const catRes = await fetch('http://localhost:4000/api/products/categories');
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }
    } catch (err) {
      console.warn('Backend NestJS no disponible o cargando fallback:', err);
      setProducts(FALLBACK_PRODUCTS);
      const uniqueCats = ['Todos', ...Array.from(new Set(FALLBACK_PRODUCTS.map((p) => p.category)))];
      setCategories(uniqueCats);
      setIsBackendConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === 'Todos' ||
        p.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  // Cart Handlers
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // Show temporary toast
    setToastMessage(`"${product.name}" añadido al carrito`);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <Navbar
        cartCount={totalCartItems}
        onOpenCart={() => setIsCartOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Hero Banner */}
      <Hero onExplore={scrollToCatalog} />

      {/* Main Content / Catalog */}
      <main id="catalog" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Section Header & Status indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Catálogo de Productos
              </h2>
              {isBackendConnected ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  NestJS API Conectado
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Modo Local / Verificando API
                </span>
              )}
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Explora nuestra selección tecnológica y agrega tus favoritos al carrito.
            </p>
          </div>

          <button
            onClick={fetchProducts}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Layers className="w-4 h-4 text-slate-400 mr-1 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-indigo-500/25 ring-2 ring-indigo-600 ring-offset-2'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-4" />
            <p className="text-sm font-semibold text-slate-600">
              Cargando productos desde el backend NestJS...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200 p-8">
            <p className="text-base font-bold text-slate-700">
              No se encontraron productos
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Intenta cambiar los términos de búsqueda o selecciona otra categoría.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Todos');
                setSearchTerm('');
              }}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
            >
              Restablecer filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                isInCart={cart.some((item) => item.product.id === product.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-800 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 TechStore Inc. Desarrollado con NestJS REST API + Next.js React.</p>
          <div className="flex gap-6">
            <span className="hover:text-indigo-600 cursor-pointer">Privacidad</span>
            <span className="hover:text-indigo-600 cursor-pointer">Términos</span>
            <span className="hover:text-indigo-600 cursor-pointer">Soporte Técnico</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
