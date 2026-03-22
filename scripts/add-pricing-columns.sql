-- Add mrp and sale_price columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS mrp DECIMAL(10, 2);
ALTER TABLE products ADD COLUMN IF NOT EXISTS sale_price DECIMAL(10, 2);

-- Add comment to explain the columns
COMMENT ON COLUMN products.mrp IS 'Maximum Retail Price (MRP) of the product';
COMMENT ON COLUMN products.sale_price IS 'Current selling price of the product';

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_products_sale_price ON products(sale_price);
CREATE INDEX IF NOT EXISTS idx_products_mrp ON products(mrp);
