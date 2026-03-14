-- Create coupons table
CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL,
  discount_value DECIMAL(10, 2) NOT NULL,
  max_discount DECIMAL(10, 2),
  min_order_value DECIMAL(10, 2),
  applicable_type VARCHAR(20) NOT NULL DEFAULT 'all',
  applicable_products UUID[] DEFAULT '{}',
  applicable_categories VARCHAR[] DEFAULT '{}',
  usage_limit INT,
  per_user_limit INT DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  expires_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create coupon usage tracking table
CREATE TABLE IF NOT EXISTS public.coupon_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coupon_id UUID NOT NULL REFERENCES public.coupons(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  used_at TIMESTAMP DEFAULT NOW(),
  discount_amount DECIMAL(10, 2) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_coupons_code ON public.coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_active ON public.coupons(is_active);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_user ON public.coupon_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_coupon_usage_coupon ON public.coupon_usage(coupon_id);
