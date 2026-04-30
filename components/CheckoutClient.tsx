'use client';

import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Lock } from 'lucide-react';
import Link from 'next/link';

// Module-scope: loadStripe called once
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface PaymentFormProps {
  paymentIntentId: string;
  customerEmail: string;
  customerName: string;
  items: Array<{
    product_id: string;
    product_name: string;
    price: number;
    quantity: number;
  }>;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  onSuccess: () => void;
}

function PaymentForm({
  paymentIntentId,
  customerEmail,
  customerName,
  items,
  subtotal,
  shipping,
  tax,
  total,
  onSuccess,
}: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: 'if_required',
    });

    if (error) {
      setErrorMessage(error.message || 'Payment failed. Please try again.');
      setSubmitting(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Save order to database
      try {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            stripe_payment_intent_id: paymentIntentId,
            customer_email: customerEmail,
            customer_name: customerName,
            items,
            subtotal,
            shipping,
            tax,
            total,
          }),
        });
      } catch (err) {
        console.error('Failed to save order:', err);
      }

      onSuccess();
    } else {
      setErrorMessage('Payment was not completed. Please try again.');
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
          {errorMessage}
        </div>
      )}
      <button
        type="submit"
        disabled={!stripe || !elements || submitting}
        className="w-full btn-primary gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Pay ${total.toFixed(2)}
          </>
        )}
      </button>
    </form>
  );
}

export default function CheckoutClient() {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [formReady, setFormReady] = useState(false);

  const shipping = totalPrice >= 50 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  const orderItems = items.map((item) => ({
    product_id: item.product.id,
    product_name: item.product.name,
    price: item.product.price,
    quantity: item.quantity,
  }));

  useEffect(() => {
    if (items.length === 0) {
      setLoading(false);
      return;
    }

    if (!formReady) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch('/api/stripe/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: total,
        items: orderItems,
        customerEmail,
        customerName,
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) {
          setError(d.error);
        } else {
          setClientSecret(d.clientSecret);
          setPaymentIntentId(d.paymentIntentId);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to initialize payment. Please try again.');
        setLoading(false);
      });
  }, [formReady]);

  const handleSuccess = () => {
    clearCart();
    router.push('/checkout/success');
  };

  if (items.length === 0 && !loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
        <p className="text-gray-500 mt-2">
          Add some items to your cart before checking out.
        </p>
        <Link href="/products" className="mt-6 inline-flex items-center gap-2 btn-primary">
          <ArrowLeft className="h-4 w-4" />
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Cart
      </Link>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Customer info & payment */}
        <div className="space-y-6">
          {/* Customer Information */}
          {!formReady && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Customer Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <button
                  onClick={() => {
                    if (customerName.trim() && customerEmail.trim()) {
                      setFormReady(true);
                    }
                  }}
                  disabled={!customerName.trim() || !customerEmail.trim()}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Payment Form */}
          {formReady && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Payment Details
              </h2>
              <div className="mb-4 bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{customerName}</span> &bull;{' '}
                  {customerEmail}
                </p>
                <button
                  onClick={() => {
                    setFormReady(false);
                    setClientSecret(null);
                  }}
                  className="text-xs text-primary-600 hover:text-primary-700 font-medium mt-1"
                >
                  Edit
                </button>
              </div>

              {loading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                  <span className="ml-3 text-gray-500">Loading payment form...</span>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-3">
                  {error}
                </div>
              )}

              {clientSecret && !loading && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: { theme: 'stripe' },
                  }}
                >
                  <PaymentForm
                    paymentIntentId={paymentIntentId}
                    customerEmail={customerEmail}
                    customerName={customerName}
                    items={orderItems}
                    subtotal={totalPrice}
                    shipping={shipping}
                    tax={tax}
                    total={total}
                    onSuccess={handleSuccess}
                  />
                </Elements>
              )}
            </div>
          )}
        </div>

        {/* Right: Order Summary */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Order Summary
            </h2>

            {/* Items list */}
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">
                      {item.product.category === 'Electronics' && '💻'}
                      {item.product.category === 'Clothing' && '👕'}
                      {item.product.category === 'Home & Garden' && '🏡'}
                      {item.product.category === 'Sports' && '⚽'}
                      {item.product.category === 'Books' && '📚'}
                      {item.product.category === 'Beauty' && '✨'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className="font-medium text-green-600">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax (estimated)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="font-bold text-gray-900 text-lg">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
