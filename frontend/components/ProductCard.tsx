'use client';

import React from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  isInCart = false,
}) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Tag badge */}
        {product.tag && (
          <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm bg-indigo-600 text-white">
            {product.tag}
          </span>
        )}

        {/* Stock pill */}
        <span className="absolute top-3 right-3 px-2 py-0.5 text-[11px] font-medium rounded-full bg-black/60 backdrop-blur-sm text-white">
          Stock: {product.stock}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category */}
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
            {product.category}
          </span>

          {/* Title */}
          <h3 className="mt-1.5 text-base font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h3>

          {/* Description */}
          <p className="mt-1 text-xs text-slate-500 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="mt-3 flex items-center gap-1.5 text-amber-500">
            <Star className="w-4 h-4 fill-amber-400 stroke-amber-400" />
            <span className="text-xs font-bold text-slate-700">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[11px] text-slate-400">
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.originalPrice && (
              <span className="text-[10px] font-bold text-emerald-600">
                Ahorras ${(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95 ${
              isInCart
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-600/25'
            }`}
          >
            {isInCart ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>En Carrito</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Añadir</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
