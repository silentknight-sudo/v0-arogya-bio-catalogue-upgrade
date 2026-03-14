-- Remove featured products table and reorganize to use catalogue products with categories
-- This script drops the featured_products table as we'll now display products by category

DROP TABLE IF EXISTS public.featured_products CASCADE;

-- Add a comment to products table noting that all products are now displayed via catalogue by category
COMMENT ON TABLE public.products IS 'All products are displayed via catalogue page, organized by category. No special featured products table needed.';
