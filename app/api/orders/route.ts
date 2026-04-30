import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Supabase not configured' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const body = await req.json();
    const { stripe_payment_intent_id, customer_email, customer_name, items, subtotal, shipping, tax, total } = body;

    if (!stripe_payment_intent_id) {
      return NextResponse.json(
        { error: 'Missing payment intent ID' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('orders')
      .insert({
        stripe_payment_intent_id,
        customer_email: customer_email || '',
        customer_name: customer_name || '',
        items: items || [],
        subtotal: subtotal || 0,
        shipping: shipping || 0,
        tax: tax || 0,
        total: total || 0,
        status: 'completed',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ order: data });
  } catch (error: any) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
