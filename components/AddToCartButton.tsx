'use client';

import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    if (!product.in_stock) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={!product.in_stock}
      className="w-full btn-primary text-base gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
    >
      {added ? (
        <>
          <Check className="h-5 w-5" />
          Added to Cart!
        </>
      ) : (
        <>
          <ShoppingCart className="h-5 w-5" />
          {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
        </>
      )}
    </button>
  );
}
