-- Update any NULL or missing image URLs in health_kits table
UPDATE public.health_kits
SET image_url = '/public/kits/arogyabio-immunity-boost-kit.jpg'
WHERE image_url IS NULL AND name = 'Arogyabio Immunity Boost Kit';

UPDATE public.health_kits
SET image_url = '/public/kits/arogyabio-digestive-wellness-kit.jpg'
WHERE image_url IS NULL AND name = 'Arogyabio Digestive Wellness Kit';

UPDATE public.health_kits
SET image_url = '/public/kits/arogyabio-joint-care-kit.jpg'
WHERE image_url IS NULL AND name = 'Arogyabio Joint Care Kit';

UPDATE public.health_kits
SET image_url = '/public/kits/arogyabio-stress-relief-kit.jpg'
WHERE image_url IS NULL AND name = 'Arogyabio Stress Relief Kit';

UPDATE public.health_kits
SET image_url = '/public/kits/arogyabio-heart-care-kit.jpg'
WHERE image_url IS NULL AND name = 'Arogyabio Heart Care Kit';

UPDATE public.health_kits
SET image_url = '/public/kits/arogyabio-skin-wellness-kit.jpg'
WHERE image_url IS NULL AND name = 'Arogyabio Skin & Beauty Kit';

UPDATE public.health_kits
SET image_url = '/public/kits/arogyabio-women-wellness-kit.jpg'
WHERE image_url IS NULL AND name = 'Arogyabio Women Wellness Kit';

UPDATE public.health_kits
SET image_url = '/public/kits/arogyabio-mens-vitality-kit.jpg'
WHERE image_url IS NULL AND name = 'Arogyabio Men Vitality Kit';

UPDATE public.health_kits
SET image_url = '/public/kits/arogyabio-detox-cleanse-kit.jpg'
WHERE image_url IS NULL AND name = 'Arogyabio Detox & Cleanse Kit';

UPDATE public.health_kits
SET image_url = '/public/kits/arogyabio-weight-management-kit.jpg'
WHERE image_url IS NULL AND name = 'Arogyabio Weight Management Kit';

UPDATE public.health_kits
SET image_url = '/public/kits/arogyabio-diabetes-care-kit.jpg'
WHERE image_url IS NULL;
