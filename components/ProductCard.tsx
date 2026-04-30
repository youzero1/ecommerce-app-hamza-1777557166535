'use client';

import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.in_stock) {
      addItem(product);
    }
  };

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        {/* Image Placeholder */}
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">
              {product.category === 'Electronics' && '💻'}
              {product.category === 'Clothing' && '👕'}
              {product.category === 'Home & Garden' && '🏡'}
              {product.category === 'Sports' && '⚽'}
              {product.category === 'Books' && '📚'}
              {product.category === 'Beauty' && '✨'}
            </span>
          </div>
          {!product.in_stock && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded text-gray-700">
            {product.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">
              {product.rating}
            </span>
            <span className="text-xs text-gray-500">
              ({product.reviews_count.toLocaleString()})
            </span>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={!product.in_stock}
              className="p-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
