import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mt-4">
        Page Not Found
      </h2>
      <p className="text-gray-500 mt-2">
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="mt-6 inline-flex items-center gap-2 btn-primary">
        <Home className="h-4 w-4" />
        Go Home
      </Link>
    </div>
  );
}
