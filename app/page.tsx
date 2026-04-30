import HeroSection from '@/components/HeroSection';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { demoProducts, demoCategories } from '@/lib/demo-data';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const featuredProducts = demoProducts.slice(0, 8);

  return (
    <div>
      <HeroSection />

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
            <p className="text-gray-500 mt-1">Find what you need, fast</p>
          </div>
          <Link
            href="/categories"
            className="text-primary-600 hover:text-primary-700 text-sm font-semibold inline-flex items-center gap-1"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {demoCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Products
              </h2>
              <p className="text-gray-500 mt-1">
                Handpicked items just for you
              </p>
            </div>
            <Link
              href="/products"
              className="text-primary-600 hover:text-primary-700 text-sm font-semibold inline-flex items-center gap-1"
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white text-center">
          <h2 className="text-3xl font-bold">Ready to find your next favorite?</h2>
          <p className="mt-3 text-primary-100 max-w-md mx-auto">
            Browse our full catalog of carefully curated products from top brands.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex items-center gap-2 bg-white text-primary-700 font-semibold py-3 px-6 rounded-lg hover:bg-primary-50 transition-colors"
          >
            Explore All Products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
