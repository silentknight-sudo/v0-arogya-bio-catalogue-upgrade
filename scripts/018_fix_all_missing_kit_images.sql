-- Update all health kits with images, including any that might be missing
UPDATE public.health_kits
SET image_url = '/kits/arogyabio-immunity-boost-kit.jpg'
WHERE name ILIKE '%immunity%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-digestive-wellness-kit.jpg'
WHERE name ILIKE '%digestive%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-joint-care-kit.jpg'
WHERE name ILIKE '%joint%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-stress-relief-kit.jpg'
WHERE name ILIKE '%stress%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-heart-care-kit.jpg'
WHERE name ILIKE '%heart%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-skin-wellness-kit.jpg'
WHERE name ILIKE '%skin%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-women-wellness-kit.jpg'
WHERE name ILIKE '%women%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-mens-vitality-kit.jpg'
WHERE name ILIKE '%men%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-detox-cleanse-kit.jpg'
WHERE name ILIKE '%detox%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-weight-management-kit.jpg'
WHERE name ILIKE '%weight%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-diabetes-management-kit.jpg'
WHERE name ILIKE '%diabetes%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-cough-cold-kit.jpg'
WHERE name ILIKE '%cough%' OR name ILIKE '%cold%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-hair-care-kit.jpg'
WHERE name ILIKE '%hair%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-eye-care-kit.jpg'
WHERE name ILIKE '%eye%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-migraine-relief-kit.jpg'
WHERE name ILIKE '%migraine%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-liver-support-kit.jpg'
WHERE name ILIKE '%liver%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-bone-strength-kit.jpg'
WHERE name ILIKE '%bone%' AND image_url IS NULL;

UPDATE public.health_kits
SET image_url = '/kits/arogyabio-complete-wellness-kit.jpg'
WHERE (name ILIKE '%complete%' OR name ILIKE '%ultimate%') AND image_url IS NULL;

-- Set default image for any remaining kits without images
UPDATE public.health_kits
SET image_url = '/kits/arogyabio-immunity-boost-kit.jpg'
WHERE image_url IS NULL OR image_url = '';
