-- Create health kits table
CREATE TABLE IF NOT EXISTS public.health_kits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    long_description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    image_url TEXT,
    benefits TEXT[] DEFAULT ARRAY[]::TEXT[],
    included_products TEXT[] DEFAULT ARRAY[]::TEXT[],
    category TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.health_kits ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to allow public read access
CREATE POLICY health_kits_select_public ON public.health_kits
    FOR SELECT USING (is_active = TRUE);

-- Insert health kits based on the programme booklet
INSERT INTO public.health_kits (name, description, long_description, price, category, benefits, included_products) VALUES
(
    'Arogyabio Stress & Anxiety Relief Kit',
    'For Calm Mind, Deep Sleep & Inner Balance',
    'Complete Ayurvedic care for mind and sleep. Balance your stress. Restore your peace - naturally.',
    2025.00,
    'Mental Wellness',
    ARRAY['Calms racing thoughts and overthinking', 'Promotes deeper, more restful sleep', 'Relieves stress-linked acidity and tension', 'Supports mental clarity and calm focus', 'Reduces irritability and emotional burnout', 'Relaxes nerves, balances mood naturally'],
    ARRAY['Brahmi Oil', 'Ashwagandha Tablet', 'Sleep Support Capsule', 'Stress Relief Tea']
),
(
    'Arogyabio Joint Care Kit',
    'For Stronger Joints, Flexible Movement & Daily Comfort',
    'Revive your joints, reclaim your freedom - naturally with Ayurveda. Complete support for joint health and mobility.',
    2025.00,
    'Joint Health',
    ARRAY['Supports healthy joint function', 'Improves flexibility and movement', 'Reduces morning stiffness', 'Supports healthy cartilage', 'Helps manage joint discomfort', 'Suitable for active lifestyle'],
    ARRAY['Arthro FP Oil', 'Joint Care Tablet', 'Turmeric Supplement', 'Gokshur Powder']
),
(
    'Arogyabio Weight Management Kit',
    'Break the Cycle. Burn Fat. Regain Control.',
    'Complete Ayurvedic support for healthy weight loss. Lose weight the right way safely, naturally, and for life.',
    1795.00,
    'Weight & Metabolism',
    ARRAY['Helps maintain healthy weight', 'Reduces belly fat and bloating', 'Improves digestion and gut cleansing', 'Boosts metabolism for natural fat burning', 'Helps control sugar and cholesterol', 'Eases movement for better daily activity'],
    ARRAY['Weight Balance Capsule', 'Metabolism Booster', 'Digestive Support Tablet', 'Energy Support Tea']
),
(
    'Arogyabio Diabetes Management Kit',
    'Science-Based Ayurvedic Kit for Blood Sugar Balance & Daily Strength',
    'Don''t just control sugar - Support your body with Ayurvedic strength, balance, and vitality. Feel better. Move better. Live naturally - every day.',
    1420.00,
    'Blood Sugar Support',
    ARRAY['Supports healthy blood sugar levels', 'Boosts energy and reduces fatigue', 'Improves digestion and metabolism', 'Supports pancreatic health', 'Reduces weakness and dizziness', 'Promotes overall vitality'],
    ARRAY['Diabetes Management Syrup', 'Blood Sugar Tablet', 'Energy Boosting Tea', 'Digestive Enzyme']
),
(
    'Arogyabio Cough & Cold Care Kit',
    'Your Family''s Everyday Ayurvedic Shield for Cough, Cold & Pollution',
    'An essential Ayurvedic remedy to keep handy at home - always. Keep the Cough & Cold Care Programme in every home.',
    820.00,
    'Respiratory Health',
    ARRAY['Soothes sore throat and clears mucus', 'Calms dry or wet cough naturally', 'Helps fight infection and viral discomfort', 'Builds immunity from within', 'Safe for daily use - no chemicals or steroids', 'Effective against pollution and weather-induced issues'],
    ARRAY['Kofherbo Syrup', 'Cough Relief Tablet', 'Tulsi Drops', 'Immunity Booster']
),
(
    'Arogyabio Hair Care Kit',
    'Ayurvedic Hair Spa at Home - For Nourished Roots, Strong Strands & Natural Shine',
    'Your hair deserves more than a wash - give it the gift of Ayurveda, right at home. Turn your weekly hair routine into a relaxing herbal rejuvenation ritual.',
    1050.00,
    'Hair & Scalp Health',
    ARRAY['Reduces hair fall and strengthens follicles', 'Gentle herbal cleansing without chemicals', 'Restores softness and shine', 'Prevents dryness and breakage', 'Reduces premature greying', 'Promotes scalp and hair health'],
    ARRAY['Keshohills Oil', 'Keshohills Shampoo', 'Keshohills Hair Pack']
),
(
    'Arogyabio Advanced Hair Care Kit',
    '360° Ayurvedic Hair Care - Inside & Out',
    'Ayurvedic care that works inside & out. One kit, complete care, visible results. Your hair deserves the gift of Ayurveda.',
    1970.00,
    'Hair & Scalp Health',
    ARRAY['Oil to strengthen roots and reduce fall', 'Shampoo to cleanse without chemicals', 'Hair pack to restore shine and softness', 'Capsules to nourish hair from within', 'Fights hair fall, greying and thinning', 'Complete 360° hair care solution'],
    ARRAY['Keshohills Oil', 'Keshohills Shampoo', 'Keshohills Hair Pack', 'Hair Growth Capsule']
),
(
    'Arogyabio Digestive Care Kit',
    'Cleanse Deep. Relieve Gas. Strengthen Digestion.',
    'Complete Ayurvedic support for daily digestive wellness. Improve digestion and support regular bowel movement naturally.',
    1250.00,
    'Digestive Health',
    ARRAY['Relieves gas, acidity, and indigestion', 'Reduces bloating and heaviness', 'Improves digestion and bowel movement', 'Detoxifies the gut with herbs', 'Boosts liver function', 'Enhances nutrient absorption'],
    ARRAY['Digesherbo Powder', 'Digestive Enzyme Tablet', 'Triphala Churna', 'Detox Support']
),
(
    'Arogyabio Men''s Health Kit',
    'Power Up. Perform Better. Live Strong.',
    'Complete Ayurvedic support for modern men''s health. Formulated with Ashwagandha, Safed Musli & Gokshura for stamina and vitality.',
    1895.00,
    'Men''s Health',
    ARRAY['Boosts stamina, strength, and vitality', 'Improves energy and endurance', 'Supports hormonal balance', 'Reduces fatigue and stress', 'Promotes reproductive health', 'Enhances confidence and performance'],
    ARRAY['Vito FP Capsule', 'Shilajit Forte', 'Ashwagandha Tablet', 'Energy Booster Tea']
),
(
    'Arogyabio Women''s Health Kit',
    'Balance Hormones. Boost Energy. Nourish Naturally.',
    'Complete Ayurvedic support for modern women''s health. Supports daily energy, vitality, and hormonal balance naturally.',
    1750.00,
    'Women''s Health',
    ARRAY['Supports daily energy and vitality', 'Helps manage PMS and mood swings', 'Promotes skin glow and wellness', 'Strengthens immunity', 'Supports bone health', 'Promotes reproductive wellness'],
    ARRAY['Shatavari Supplement', 'Women''s Vitality Tablet', 'Hormone Balance Tea', 'Skin Glow Capsule']
);

COMMIT;
