-- Add MRP and Sale Price columns to products table
-- This allows storing both MRP (Maximum Retail Price) and Sale Price for discount calculations

-- Add mrp column (nullable numeric)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS mrp NUMERIC(10, 2) DEFAULT NULL;

-- Add sale_price column (nullable numeric)  
ALTER TABLE products
ADD COLUMN IF NOT EXISTS sale_price NUMERIC(10, 2) DEFAULT NULL;

-- Add index for faster queries on sale_price
CREATE INDEX IF NOT EXISTS idx_products_sale_price ON products(sale_price);

-- Add index for faster queries on mrp
CREATE INDEX IF NOT EXISTS idx_products_mrp ON products(mrp);

-- Add comment to explain the columns
COMMENT ON COLUMN products.mrp IS 'Maximum Retail Price - original price before discount';
COMMENT ON COLUMN products.sale_price IS 'Sale Price - discounted price to display on website';
