import Link from 'next/link';
import { ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';

export default function HeroSection() {
  return (
    <section>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Amazing
              <br />
              Products
            </h1>
            <p className="mt-4 text-lg text-primary-100 max-w-lg">
              Shop the latest trends in electronics, fashion, home goods, and
              more. Quality products at unbeatable prices.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold py-3 px-6 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Truck className="h-6 w-6 text-primary-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Shield className="h-6 w-6 text-primary-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-500">100% protected checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-end">
              <RotateCcw className="h-6 w-6 text-primary-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm text-gray-900">Easy Returns</p>
                <p className="text-xs text-gray-500">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
