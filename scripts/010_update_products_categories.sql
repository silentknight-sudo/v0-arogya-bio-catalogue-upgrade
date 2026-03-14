-- Update products table with proper categories and add composition field
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS composition TEXT;
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS dosage TEXT;
ALTER TABLE IF EXISTS public.products ADD COLUMN IF NOT EXISTS size TEXT DEFAULT '60 Capsules';

-- Delete order items first (child table), then products
TRUNCATE TABLE public.order_items CASCADE;
TRUNCATE TABLE public.products CASCADE;

-- Insert Ayurvedic products by category from the catalog
-- Bone Health
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Calciplus Capsule', 'Bone Health', 450, 'Natural Bone & Joint Nourishment with Ashwagandha', ARRAY['Facilitates optimal calcium absorption', 'Improves Bone Strength and Density', 'Prevents degeneration of joint', 'Natural Bone & Joint Nourishment'], 'Take 1 capsule twice daily preferably after meals or as recommended by physician. For better results take with warm water', 'Shuddha Khatika (375mg), Godanti bhasma (50mg), Shankh bhasma (100mg), Mukta sukti bhasma (50mg), Kapardika bhasma (50mg)', '1-2 capsules twice daily', '60 Capsules', '/products/calciplus-capsule.jpg', 50);

-- Cough & Cold
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Kofherbo T Kwath Tablet', 'Cough & Cold', 320, 'Throat Soothing Formula with Expectorant Properties', ARRAY['Provides protection from Cough and cold', 'Beneficial in Dry & Wet cough', 'Throat Soothing Formula', 'Expectorant Properties for Mucus Removal'], 'Add 1 tea tablet in luke warm water, stir well. 2 to 3 times a day before meals', 'Miri powder (45mg), Dalchini powder (30mg), Lavang powder (45mg), Jatiphala powder (20mg), Elachi powder (45mg), Sunthee powder (250mg)', '1-2 tablets 2-3 times daily', '30 Tablets', '/products/kofherbo-tablet.jpg', 60);

-- Detoxification
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Detoxherbo Tablet', 'Detoxification', 380, 'Natural Detoxification and Liver Support', ARRAY['Improves Digestion', 'Eliminates Toxins Naturally', 'Supports Healthy Liver Function', 'Supports Immune Health'], 'Take 1 tablet twice daily preferably after meals or as recommended by physician', 'Pudina (750mg), Triphala (600mg), Jeera (375mg), Sunthee (150mg), Garcinia (150mg)', '1 tablet twice daily', '60 Tablets', '/products/detoxherbo-tablet.jpg', 45),
('Detoxherbo Syrup', 'Detoxification', 420, 'Refreshing Detox Syrup for Gut Cleansing', ARRAY['Supports Natural Detoxification', 'Cleanses the Gut Naturally', 'Reduces Bloating & Discomfort', 'Refreshing Flavor for Better Taste'], 'Take 15ml twice daily - before breakfast & before dinner', 'Triphala, Pudina, Ajma, Dhania, Sunthee', '15ml twice daily', '500ml', '/products/detoxherbo-syrup.jpg', 30);

-- Digestion Support
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Digesherbo Tablet', 'Digestion Support', 340, 'Supports Healthy Digestion and Nutrient Absorption', ARRAY['Supports healthy digestion', 'Relieves indigestion, Gas and bloating', 'Supports Healthy Gut function', 'Helps in Nutrient absorption'], 'Take 1 tablet twice daily preferably after meals or as recommended by physician', 'Ajma Churna (50mg), Belgarba Ghana (50mg), Chitrak Ghana (50mg), Haritaki (100mg)', '1 tablet twice daily', '60 Tablets', '/products/digesherbo-tablet.jpg', 55),
('Digesherbo Syrup', 'Digestion Support', 400, 'Rapid Relief from Acidity with Natural Jeera Flavour', ARRAY['Rapid Relief from Acidity, gas & Indigestion', 'Supports Healthy Gut function', 'Natural Jeera Flavour for Enhanced Taste', 'Easy to Sip Herbal Digestive Shots'], 'Take 15ml twice daily - before breakfast & before dinner', 'Triphala powder (375mg), Ajma powder (135mg), Dhania powder (67.5mg), Jeera powder (90mg)', '15ml twice daily', '500ml', '/products/digesherbo-syrup.jpg', 35);

-- Eye Care
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Occuplus Capsule', 'Eye Care', 520, 'Nourish Eyes with Triphala and Cow Ghee', ARRAY['Nourishes Eyes with goodness of Triphala and Cow Ghee', 'Supports Healthy vision', 'Manages Eye Strain and Fatigue', 'Improves Clear and Sharp eyesight'], 'Take 2 soft gel capsules daily in the morning or as recommended by physician. Take on empty stomach before meals', 'Go-ghruta (500mg), Triphala (500mg)', '2 capsules daily', '30 Soft Gel Capsules', '/products/occuplus-capsule.jpg', 40);

-- Hair Care
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Keshovedic Tablet', 'Hair Care', 380, 'Supports Healthy and Vibrant Hair Growth', ARRAY['Supports Healthy and Vibrant Hair Growth', 'Nourishes Scalp and Hair with Ayurvedic Herbs', 'Improves Hair Texture and Adds Natural Shine', 'Strengthens Hair follicles & Prevents Hair fall'], 'Take 1 tablet twice daily preferably after meals or as recommended by physician', 'Amalaki Ghana (135mg), Bhrungraj Ghana (135mg), Kumari Swaras (75mg), Mandukparnee Ghana (135mg)', '1 tablet twice daily', '60 Tablets', '/products/keshovedic-tablet.jpg', 50);

-- Heart Care
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Cardiplus Tablet', 'Heart Care', 480, 'Improves Cardiovascular Health with Antioxidant Formula', ARRAY['Improves Cardiovascular Health', 'Antioxidant-rich Formula', 'Supports natural balance for healthy lipid levels', 'Helps manage stress and improve circulation'], 'Take 1 tablet twice daily, preferably after meals or as directed by physician', 'Arjuna Extract (100mg), Lasun Powder (100mg), Shuddha Guggul (75mg), Methi Powder (50mg)', '1 tablet twice daily', '60 Tablets', '/products/cardiplus-tablet.jpg', 45);

-- Gout Care
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Gautyplus Tablet', 'Gout Care', 420, 'Eliminates Excess Uric Acid and Relieves Joint Pain', ARRAY['Eliminates Excess Uric Acid from body', 'Relieves Joint Pain', 'Reduces excessive swelling & Stiffness', 'Prevents future gout flare-ups'], 'Take 1 tablet twice daily preferably after meals or as recommended by physician', 'Guduchi (125mg), Vasa extract (100mg), Haridra extract (50mg), Triphala extract (50mg)', '1 tablet twice daily', '60 Tablets', '/products/gautyplus-tablet.jpg', 40);

-- Immunity Support
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Immuno FP Capsule', 'Immunity Support', 550, 'Balanced Immune Function with Antioxidant Blend', ARRAY['Supports balanced immune function', 'Supports healthy digestion', 'Acts as an antioxidant', 'Helps to relieve fatigue'], 'Take 1 capsule twice daily, preferably after meals or as directed by physician', 'Ashwagandha (102mg), Yashtimadhu (102mg), Amla (52mg), Tulsi (34mg), Giloy (41.40mg)', '1 capsule twice daily', '60 Capsules', '/products/immuno-fp-capsule.jpg', 55),
('H H Tulsi Drops', 'Immunity Support', 380, 'Triple Tulsi Extract for Immune and Respiratory Health', ARRAY['Protection from Cough and cold', 'Supports Immune Health', 'Prevents recurrent infections', 'Soothes respiratory track'], 'Take one drop in glass of water or tea 4-5 times a day', 'Vishnu Priya Tulsi Extract, Rama Tulsi Extract, Bisva Tulsi Extract', '4-5 drops, 4-5 times daily', '30ml', '/products/tulsi-drops.jpg', 35);

-- Joint Care
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Arthroplus Soft Gelatin Capsule', 'Joint Care', 590, 'Joint Pain Relief and Natural Lubrication', ARRAY['Relieves joint pain and inflammation', 'Prevents degeneration of joint', 'Pure Ghee provides natural lubrication and nourishment', 'Strengthens the joints Naturally'], 'Take 2 soft gel capsules daily in the morning or as recommended by physician', 'Nirgundee (45.45mg), Methi (45.45mg), Mukul extract (45.45mg), Go-ghruta (500mg)', '2 capsules daily', '60 Soft Capsules', '/products/arthroplus-capsule.jpg', 45),
('Arthro FP Capsule', 'Joint Care', 480, 'Support Healthy Bones and Joints with Natural Blend', ARRAY['Support healthy bones and joints', 'Reduce pain and inflammation', 'Improve joint mobility & strengthen muscles & ligaments'], 'Take 1 capsule twice daily, preferably after meals or as directed by physician', 'Nirgundee Powder (162.50mg), Methi Powder (122.90mg), Haridra (42.30mg)', '1 capsule twice daily', '60 Capsules', '/products/arthro-fp-capsule.jpg', 50),
('Arthro FP Oil', 'Joint Care', 320, 'Traditional Oil Blend for Joint and Muscle Comfort', ARRAY['Natural joint pain relief', 'Nourishes and strengthens joint tissue', 'Enhances joint flexibility', 'Encourages easy Flexibility & Movements'], 'Take sufficient quantity of oil & apply on affected part, massage gently to facilitate penetration', 'Nirgundi Oil (20ml), Nilgiri Oil (6.6ml), Dhatura Oil (5ml), Lemon Grass Oil (5ml)', 'Apply as needed', '100ml', '/products/arthro-fp-oil.jpg', 60);

-- Migraine Support
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Migraplus Tablet', 'Migraine Support', 420, 'Natural Relief from Migraine Symptoms', ARRAY['Offers relief in migraine symptoms', 'Reduces Headache Discomfort', 'Relieves Tension & Triggers of Migraine', 'Natural Approach to manage migraine'], 'Take 1 tablet twice daily preferably after meals or as recommended by physician', 'Godanti Bhasma (100mg), Sajjikshar Powder (50mg), Brahmi Extract (50mg)', '1 tablet twice daily', '60 Tablets', '/products/migraplus-tablet.jpg', 40);

-- Men's Health
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Vito FP Capsule', 'Men''s Health', 620, 'Ayurvedic Men''s Health with Natural Stamina Enhancement', ARRAY['Improves Vitality and Stamina', 'Increases Energy Levels', 'Natural Aphrodisiac Properties', 'Supports Overall Health & Vitality'], 'Take 1 capsule twice daily, preferably after meals or as directed by physician', 'Ashwagandha (42.80mg), Safed Musli (2.72mg), Krounchbeej (77.40mg), Vidarikand (72mg)', '1 capsule twice daily', '60 Capsules', '/products/vito-fp-capsule.jpg', 50),
('Shilajit Forte Capsule', 'Men''s Health', 680, 'Enriched Shilajit Blend for Men''s Vitality', ARRAY['Enhances Vitality & Stamina', 'Supports an Active Lifestyle', 'Enhances Stamina and Energy', 'Supports Overall Health & Vitality'], 'Take one capsule twice daily preferably after meals. For better results take with warm water', 'Shilajit Extract (150mg), Gokshur extract (150mg), Ashwagandha extract (100mg)', '1 capsule twice daily', '60 Capsules', '/products/shilajit-forte.jpg', 35),
('Shilajit Suspension', 'Men''s Health', 480, 'Liquid Shilajit Formula for Enhanced Energy', ARRAY['Enhances Vitality & Stamina', 'Improves Energy Levels', 'Natural Aphrodisiac Herbs', 'Supports Overall Vitality'], 'Take 15ml twice daily - before breakfast & before dinner', 'Shilajit Extract, Gokshur extract, Ashwagandha extract, Krounchbeej powder', '15ml twice daily', '500ml', '/products/shilajit-suspension.jpg', 30);

-- Piles Care
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Arsovedic Tablet', 'Piles Care', 400, 'Eases Discomfort Associated with Hemorrhoids', ARRAY['Eases discomfort associated with hemorrhoids', 'Calms inflammation and redness', 'Relieves itching and irritation', 'Supports comfortable and pain-Free bowel evacuation'], 'Take 1 tablet twice daily preferably after meals or as recommended by physician', 'Suran Extract (200mg), Nagkesar Extract (50mg), Triphala Extract (50mg)', '1 tablet twice daily', '60 Tablets', '/products/arsovedic-tablet.jpg', 45);

-- Stress Management
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Turmeric LT Tablet & Powder', 'Stress Management', 350, 'Anti-inflammatory Turmeric Latte with Golden Spice Blend', ARRAY['Anti-inflammatory Properties for respiratory comfort', 'Supports immune health', 'Antioxidant-rich Formula', 'Improves skin health and purifies blood'], 'Add 1-2 tablets in lukewarm Milk or water, stir well. For powder: Add 1 tsp (3g) to hot milk', 'Turmeric Powder (Curcuma longa), Cinnamon (30mg), Ginger (250mg), Black Pepper', '1-2 tablets or 3g powder twice daily', '30 Tablets/100g', '/products/turmeric-latte.jpg', 50);

-- Women's Health
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Shatavari Supplement', 'Women''s Health', 550, 'Traditional Women''s Health Support Formula', ARRAY['Supports women''s health and vitality', 'Nourishes reproductive system', 'Promotes hormonal balance', 'Supports overall wellness'], 'Take 1 capsule twice daily preferably after meals', 'Shatavari Root (400mg), Ashwagandha (100mg), Brahmi (50mg)', '1 capsule twice daily', '60 Capsules', '/products/shatavari-supplement.jpg', 40);

-- Skin Care
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Neem Herbal Tablet', 'Skin Care', 360, 'Pure Neem for Skin Purification and Detoxification', ARRAY['Supports skin purification', 'Promotes clear and healthy skin', 'Natural detoxification support', 'Helps maintain skin radiance'], 'Take 1 tablet twice daily with water', 'Neem Extract (500mg), Turmeric (100mg), Ashwagandha (50mg)', '1-2 tablets twice daily', '60 Tablets', '/products/neem-tablet.jpg', 55);

-- Weight Management
INSERT INTO public.products (name, category, price, description, benefits, usage, composition, dosage, size, image_url, stock_quantity) VALUES
('Weight Balance Capsule', 'Weight Management', 480, 'Natural Support for Healthy Weight Management', ARRAY['Supports healthy weight management', 'Boosts metabolism naturally', 'Supports healthy digestion', 'Helps reduce cravings'], 'Take 1 capsule twice daily with water before meals', 'Garcinia Extract (300mg), Triphala (200mg), Ginger (100mg), Turmeric (50mg)', '1 capsule twice daily', '60 Capsules', '/products/weight-balance-capsule.jpg', 45);

COMMIT;
