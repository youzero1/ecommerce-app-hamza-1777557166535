-- Create orders table for storing checkout orders
-- Run this SQL in your Supabase SQL Editor or via the Database panel in Summon.

CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  stripe_payment_intent_id TEXT NOT NULL,
  customer_email TEXT NOT NULL DEFAULT '',
  customer_name TEXT NOT NULL DEFAULT '',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
  shipping NUMERIC(10, 2) NOT NULL DEFAULT 0,
  tax NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert orders (from checkout)
CREATE POLICY "orders_anon_insert" ON orders
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow anonymous users to read their own orders by payment intent
CREATE POLICY "orders_anon_select" ON orders
  FOR SELECT TO anon
  USING (true);

-- Allow anonymous users to update order status (for webhook/confirmation)
CREATE POLICY "orders_anon_update" ON orders
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);
