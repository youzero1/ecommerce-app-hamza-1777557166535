import CheckoutClient from '@/components/CheckoutClient';

export const metadata = {
  title: 'Checkout — ShopHub',
  description: 'Complete your purchase securely with Stripe.',
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
