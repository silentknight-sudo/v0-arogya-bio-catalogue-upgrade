-- Fix kit image paths - convert /kits/ to /public/kits/ for proper URL resolution
UPDATE health_kits
SET image_url = REPLACE(image_url, '/kits/', '/public/kits/')
WHERE image_url LIKE '/kits/%' AND image_url NOT LIKE '/public/kits/%';

-- Ensure all image URLs have the /public/kits/ prefix
UPDATE health_kits
SET image_url = CONCAT('/public/kits/', image_url)
WHERE image_url IS NOT NULL AND image_url != '' AND image_url NOT LIKE '/public%';

COMMIT;
