-- Create coupons table for discount codes
CREATE TABLE public.coupons (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code varchar(50) NOT NULL UNIQUE,
  description text,
  discount_type varchar(20) NOT NULL DEFAULT 'percentage',
  discount_value numeric(10,2) NOT NULL,
  max_discount numeric(10,2),
  min_order_value numeric(10,2),
  applicable_type varchar(20) NOT NULL DEFAULT 'all',
  usage_limit integer,
  per_user_limit integer DEFAULT 1,
  is_active boolean DEFAULT true,
  expires_at timestamp,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE INDEX idx_coupons_code ON public.coupons(code);
CREATE INDEX idx_coupons_active ON public.coupons(is_active);

-- Create coupon_usage table to track redemptions
CREATE TABLE public.coupon_usage (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  coupon_id uuid NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  used_at timestamp DEFAULT now(),
  discount_amount numeric(10,2) NOT NULL
);

CREATE INDEX idx_coupon_usage_user ON public.coupon_usage(user_id);
CREATE INDEX idx_coupon_usage_coupon ON public.coupon_usage(coupon_id);
