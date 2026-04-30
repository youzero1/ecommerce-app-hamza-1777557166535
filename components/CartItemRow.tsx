'use client';

import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '@/types';
import { useCart } from '@/lib/cart-context';

export default function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4">
      {/* Image Placeholder */}
      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-3xl">
          {item.product.category === 'Electronics' && '💻'}
          {item.product.category === 'Clothing' && '👕'}
          {item.product.category === 'Home & Garden' && '🏡'}
          {item.product.category === 'Sports' && '⚽'}
          {item.product.category === 'Books' && '📚'}
          {item.product.category === 'Beauty' && '✨'}
        </span>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 text-sm truncate">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">{item.product.category}</p>
        <p className="font-bold text-gray-900 mt-1">
          ${item.product.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <Minus className="h-4 w-4 text-gray-600" />
        </button>
        <span className="w-8 text-center font-semibold text-sm">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
          className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          <Plus className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Subtotal & Remove */}
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-gray-900">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeItem(item.product.id)}
          className="text-red-500 hover:text-red-700 mt-1 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
