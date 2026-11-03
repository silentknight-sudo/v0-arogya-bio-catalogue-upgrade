-- Arogya Bio now sells only Gouthealth Oil + Gouthealth Capsules.
-- The storefront code already hides everything else; run this (optional)
-- so the database/admin panel matches. Nothing is deleted: other products are
-- marked sold out so order history stays intact.

-- 1) Rename + re-image the two products we sell
UPDATE products SET name = 'Gouthealth Oil', image_url = '/products/gouthealth-oil.png',
  description = 'Natural Joint Support Formula with Shallaki, Nirgundi and Ashwagandha. 100 ml. For external use only.'
WHERE name ILIKE '%gout%oil%';

UPDATE products SET name = 'Gouthealth Capsules', image_url = '/products/gouthealth-capsules.png',
  description = 'Ayurvedic joint support formula – Shallaki, Nirgundi, Rasna, Ashwagandha, Giloy, Ginger, Arandi. 30 x 500 mg capsules.'
WHERE name ILIKE '%gout%cap%';

-- 2) Mark every other product as sold out
UPDATE products SET stock_quantity = 0
WHERE name NOT IN ('Gouthealth Oil', 'Gouthealth Capsules');

-- To remove them completely instead (only if no orders reference them):
-- DELETE FROM products WHERE name NOT IN ('Gouthealth Oil', 'Gouthealth Capsules');
