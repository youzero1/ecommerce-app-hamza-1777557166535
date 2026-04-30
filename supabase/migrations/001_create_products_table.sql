-- Create products table for the ecommerce app
-- Run this SQL in your Supabase SQL Editor or via the Database panel in Summon.

CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(10, 2) NOT NULL DEFAULT 0,
  image TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  rating NUMERIC(2, 1) NOT NULL DEFAULT 0,
  reviews_count INTEGER NOT NULL DEFAULT 0,
  in_stock BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read products
CREATE POLICY "products_anon_select" ON products
  FOR SELECT TO anon
  USING (true);

-- Seed some sample products
INSERT INTO products (name, description, price, category, rating, reviews_count, in_stock) VALUES
  ('Wireless Noise-Canceling Headphones', 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio.', 299.99, 'Electronics', 4.8, 1243, true),
  ('Organic Cotton T-Shirt', 'Ultra-soft organic cotton t-shirt in a classic fit. Sustainably sourced and ethically manufactured.', 34.99, 'Clothing', 4.5, 867, true),
  ('Smart Home Security Camera', '1080p HD indoor/outdoor security camera with night vision, two-way audio, and motion detection.', 79.99, 'Electronics', 4.6, 2156, true),
  ('Ceramic Plant Pot Set', 'Set of 3 minimalist ceramic plant pots with drainage holes and bamboo saucers.', 42.99, 'Home & Garden', 4.7, 534, true),
  ('Professional Yoga Mat', 'Extra-thick 6mm yoga mat with non-slip surface. Eco-friendly TPE material.', 54.99, 'Sports', 4.9, 1890, true),
  ('Bestseller Novel Collection', 'Curated collection of 5 bestselling novels from 2024. Includes hardcover editions.', 89.99, 'Books', 4.4, 312, true),
  ('Portable Bluetooth Speaker', 'Waterproof portable speaker with 360-degree sound and 20-hour battery.', 129.99, 'Electronics', 4.7, 3421, true),
  ('Natural Skincare Gift Set', 'Luxury skincare set with cleanser, toner, serum, and moisturizer.', 64.99, 'Beauty', 4.8, 789, true),
  ('Denim Jacket — Classic Fit', 'Timeless denim jacket crafted from premium selvedge denim.', 119.99, 'Clothing', 4.6, 645, true),
  ('Stainless Steel Water Bottle', 'Double-walled insulated water bottle keeps drinks cold for 24h or hot for 12h.', 29.99, 'Sports', 4.5, 4523, true),
  ('LED Desk Lamp', 'Modern LED desk lamp with adjustable brightness and USB charging port.', 49.99, 'Home & Garden', 4.3, 978, true),
  ('Wireless Mechanical Keyboard', 'Compact 75% mechanical keyboard with hot-swappable switches and RGB backlighting.', 159.99, 'Electronics', 4.9, 1567, false);
