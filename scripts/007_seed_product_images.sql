-- Insert product images
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, sort_order)
SELECT id, image_url, 'Product Image', true, 1 FROM products
WHERE image_url IS NOT NULL
ON CONFLICT DO NOTHING;
