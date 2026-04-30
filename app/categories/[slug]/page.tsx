import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { demoProducts, demoCategories } from '@/lib/demo-data';

export function generateStaticParams(): Array<{ slug: string }> {
  return demoCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = demoCategories.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const products = demoProducts.filter(
    (p) => p.category === category.name
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back */}
      <Link
        href="/categories"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        All Categories
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {category.name}
            </h1>
            <p className="text-gray-500 mt-1">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Products */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">No products in this category yet.</p>
        </div>
      )}
    </div>
  );
}
