import type { Metadata } from 'next';
import { CartProvider } from '@/lib/cart-context';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'ShopHub — Your One-Stop Ecommerce Store',
  description:
    'Discover amazing products at great prices. Shop electronics, clothing, home goods, sports gear, books, and beauty products.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
