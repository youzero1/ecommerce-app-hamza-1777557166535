import { notFound } from 'next/navigation';
import { Star, ArrowLeft, Truck, Shield, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { demoProducts } from '@/lib/demo-data';
import AddToCartButton from '@/components/AddToCartButton';
import ProductCard from '@/components/ProductCard';

export function generateStaticParams(): Array<{ id: string }> {
  return demoProducts.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = demoProducts.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  const relatedProducts = demoProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Products
      </Link>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl aspect-square flex items-center justify-center">
          <span className="text-9xl">
            {product.category === 'Electronics' && '💻'}
            {product.category === 'Clothing' && '👕'}
            {product.category === 'Home & Garden' && '🏡'}
            {product.category === 'Sports' && '⚽'}
            {product.category === 'Books' && '📚'}
            {product.category === 'Beauty' && '✨'}
          </span>
        </div>

        {/* Info */}
        <div>
          <div className="mb-2">
            <span className="text-sm font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mt-3">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {product.rating}
            </span>
            <span className="text-sm text-gray-500">
              ({product.reviews_count.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-6">
            <span className="text-4xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.in_stock ? (
              <span className="ml-3 text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="ml-3 text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <p className="mt-6 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          {/* Add to Cart */}
          <div className="mt-8">
            <AddToCartButton product={product} />
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center gap-1">
              <Truck className="h-5 w-5 text-gray-400" />
              <span className="text-xs text-gray-500">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <Shield className="h-5 w-5 text-gray-400" />
              <span className="text-xs text-gray-500">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <RotateCcw className="h-5 w-5 text-gray-400" />
              <span className="text-xs text-gray-500">30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
