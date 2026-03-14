-- Update health kits with proper image URLs

UPDATE public.health_kits 
SET image_url = '/kits/arogyabio-stress-relief-kit.jpg'
WHERE name = 'Arogyabio Stress & Anxiety Relief Kit';

UPDATE public.health_kits 
SET image_url = '/kits/arogyabio-joint-care-kit.jpg'
WHERE name = 'Arogyabio Joint Care Kit';

UPDATE public.health_kits 
SET image_url = '/kits/arogyabio-weight-management-kit.jpg'
WHERE name = 'Arogyabio Weight Management Kit';

UPDATE public.health_kits 
SET image_url = '/kits/arogyabio-energy-stamina-kit.jpg'
WHERE name = 'Arogyabio Diabetes Management Kit';

UPDATE public.health_kits 
SET image_url = '/kits/arogyabio-digestive-wellness-kit.jpg'
WHERE name = 'Arogyabio Cough & Cold Care Kit';

UPDATE public.health_kits 
SET image_url = '/kits/arogyabio-skin-wellness-kit.jpg'
WHERE name = 'Arogyabio Hair Care Kit';

UPDATE public.health_kits 
SET image_url = '/kits/arogyabio-womens-wellness-kit.jpg'
WHERE name = 'Arogyabio Advanced Hair Care Kit';

UPDATE public.health_kits 
SET image_url = '/kits/arogyabio-digestive-wellness-kit.jpg'
WHERE name = 'Arogyabio Digestive Care Kit';

UPDATE public.health_kits 
SET image_url = '/kits/arogyabio-mens-vitality-kit.jpg'
WHERE name = 'Arogyabio Men''s Health Kit';

UPDATE public.health_kits 
SET image_url = '/kits/arogyabio-womens-wellness-kit.jpg'
WHERE name = 'Arogyabio Women''s Health Kit';

COMMIT;
