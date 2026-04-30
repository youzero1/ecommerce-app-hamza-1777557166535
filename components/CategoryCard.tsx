import Link from 'next/link';
import { Category } from '@/types';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md hover:border-primary-200 transition-all duration-200 cursor-pointer">
        <div className="text-4xl mb-3">{category.icon}</div>
        <h3 className="font-semibold text-gray-900 text-sm">{category.name}</h3>
      </div>
    </Link>
  );
}
