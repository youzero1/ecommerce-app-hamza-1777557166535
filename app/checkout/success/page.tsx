import Link from 'next/link';
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';

export const metadata = {
  title: 'Order Confirmed — ShopHub',
  description: 'Your order has been placed successfully.',
};

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 rounded-full p-4">
          <CheckCircle className="h-16 w-16 text-green-600" />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
      <p className="text-gray-500 mt-3 max-w-md mx-auto">
        Thank you for your purchase. Your payment has been processed
        successfully and your order has been saved.
      </p>
      <p className="text-sm text-gray-400 mt-2">
        You will receive a confirmation email shortly.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/products"
          className="btn-primary gap-2"
        >
          <ShoppingBag className="h-4 w-4" />
          Continue Shopping
        </Link>
        <Link
          href="/"
          className="btn-secondary gap-2"
        >
          Back to Home
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
