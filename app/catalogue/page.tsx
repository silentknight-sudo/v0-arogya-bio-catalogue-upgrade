'use client'

import { useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { ChevronDown } from 'lucide-react'

interface Product {
  id: string
  name: string
  form: string
  category: string
  image: string
  ingredients: string[]
  benefits: string[]
  dosage: string
  quantity: string
  storage: string
  suitable_for?: string
}

const products: Product[] = [
  // Bone Health (3 products)
  {
    id: 'bh-1',
    name: 'Arogya CalciHerb Capsules',
    form: 'Capsules',
    category: 'Bone Health',
    image: '/catalogue/arogya-calcherb-capsules.jpg',
    ingredients: ['Ashwagandha', 'Shuddha Guggulu', 'Calcium-rich herbs', 'Neem'],
    benefits: ['Supports bone density and strength', 'Promotes mineral absorption', 'Maintains skeletal health', 'Supports joint flexibility'],
    dosage: '1-2 capsules twice daily after meals with warm water',
    quantity: '60 capsules (500mg each)',
    storage: 'Store in a cool, dry place away from direct sunlight. Keep below 25°C.',
    suitable_for: 'Adults of all ages'
  },
  {
    id: 'bh-2',
    name: 'Arogya OsteoCare Gummies',
    form: 'Gummies',
    category: 'Bone Health',
    image: '/catalogue/arogya-osteocare-gummies.jpg',
    ingredients: ['Calcium extract', 'Ashwagandha', 'Sesame seed powder', 'Natural fruit flavors'],
    benefits: ['Supports bone mineral content', 'Enhances calcium absorption', 'Promotes overall skeletal health', 'Supports flexibility and mobility'],
    dosage: '2 gummies daily with meals',
    quantity: '60 gummies',
    storage: 'Keep in airtight container in cool, dry place. Avoid moisture.',
    suitable_for: 'Adults and children above 6 years'
  },
  {
    id: 'bh-3',
    name: 'Arogya BoneStrong Oil',
    form: 'Oil',
    category: 'Bone Health',
    image: '/catalogue/arogya-bonestrong-oil.jpg',
    ingredients: ['Sesame oil base', 'Ashwagandha oil', 'Shuddha Guggulu', 'Wintergreen extract'],
    benefits: ['Supports bone strength', 'Promotes joint flexibility', 'Aids circulation', 'Supports muscle relaxation'],
    dosage: 'Apply and massage on affected areas daily, 2-3 times',
    quantity: '100ml',
    storage: 'Store in cool place away from direct sunlight.',
    suitable_for: 'All ages'
  },

  // Detoxification & Liver Support (3 products)
  {
    id: 'dl-1',
    name: 'Arogya LiverClean Syrup',
    form: 'Syrup',
    category: 'Detoxification & Liver Support',
    image: '/catalogue/arogya-liverclean-syrup.jpg',
    ingredients: ['Kutki', 'Milk Thistle (Silymarin)', 'Bhumyamlaki', 'Neem', 'Tulsi'],
    benefits: ['Supports natural detoxification', 'Promotes liver function', 'Aids bile production', 'Supports metabolic health'],
    dosage: '1 tablespoon twice daily with warm water after meals',
    quantity: '200ml',
    storage: 'Store in cool, dry place below 25°C. Protect from light.',
    suitable_for: 'Adults seeking wellness support'
  },
  {
    id: 'dl-2',
    name: 'Arogya LiverGuard Capsules',
    form: 'Capsules',
    category: 'Detoxification & Liver Support',
    image: '/catalogue/arogya-liverguard-capsules.jpg',
    ingredients: ['Milk Thistle extract', 'Kutki', 'Neem', 'Turmeric', 'Bhumyamlaki'],
    benefits: ['Supports natural liver function', 'Promotes detoxification pathways', 'Aids digestive health', 'Supports natural cleansing'],
    dosage: '1-2 capsules daily with warm water after meals',
    quantity: '60 capsules (500mg each)',
    storage: 'Store in cool, dry place below 25°C. Protect from light and moisture.',
    suitable_for: 'Adults over 18 years'
  },
  {
    id: 'dl-3',
    name: 'Arogya DetoxFizz',
    form: 'Effervescent Tablets',
    category: 'Detoxification & Liver Support',
    image: '/catalogue/arogya-detoxfizz.jpg',
    ingredients: ['Triphala extract', 'Neem', 'Turmeric', 'Ginger', 'Amla'],
    benefits: ['Supports natural body detoxification', 'Promotes liver wellness', 'Aids digestive cleansing', 'Supports skin clarity'],
    dosage: '1 tablet dissolved in water twice daily',
    quantity: '30 tablets',
    storage: 'Keep in sealed container away from heat and moisture.',
    suitable_for: 'Adults over 18 years'
  },

  // Digestion Support (3 products)
  {
    id: 'ds-1',
    name: 'Arogya DigestEase Powder',
    form: 'Herbal Powder (Churna)',
    category: 'Digestion Support',
    image: '/catalogue/arogya-digestease-powder.jpg',
    ingredients: ['Ginger', 'Fennel seeds', 'Cumin seeds', 'Cardamom', 'Black salt'],
    benefits: ['Supports digestive fire (Agni)', 'Aids natural digestion', 'Promotes gut comfort', 'Reduces bloating sensations'],
    dosage: '1/4 to 1/2 teaspoon with warm water after meals',
    quantity: '150g',
    storage: 'Store in cool, dry environment. Avoid direct exposure to sunlight.',
    suitable_for: 'Adults and children above 6 years'
  },
  {
    id: 'ds-2',
    name: 'Arogya GutBalance Capsules',
    form: 'Capsules',
    category: 'Digestion Support',
    image: '/catalogue/arogya-gutbalance-capsules.jpg',
    ingredients: ['Triphala', 'Ajwain', 'Ginger', 'Black pepper', 'Asafoetida (Hing)'],
    benefits: ['Supports regular digestion', 'Promotes digestive comfort', 'Aids nutrient absorption', 'Supports natural elimination'],
    dosage: '1-2 capsules twice daily after meals',
    quantity: '60 capsules (500mg each)',
    storage: 'Keep in sealed container in cool place.',
    suitable_for: 'Adults'
  },
  {
    id: 'ds-3',
    name: 'Arogya DigestOil (Navel Therapy)',
    form: 'Oil',
    category: 'Digestion Support',
    image: '/catalogue/arogya-digestoil.jpg',
    ingredients: ['Sesame oil base', 'Ginger oil', 'Fennel extract', 'Cumin oil'],
    benefits: ['Supports digestive function', 'Promotes nutrient absorption', 'Aids natural digestion', 'Supports gut wellness'],
    dosage: '3-5 drops on navel, massage gently before bedtime',
    quantity: '50ml',
    storage: 'Store in cool place away from direct sunlight.',
    suitable_for: 'All ages'
  },

  // Gout Care (3 products)
  {
    id: 'gc-1',
    name: 'Arogya GoutRelief Capsules',
    form: 'Capsules',
    category: 'Gout Care',
    image: '/catalogue/arogya-goutrelief-capsules.jpg',
    ingredients: ['Neem', 'Turmeric (Curcuma longa)', 'Ginger', 'Punarnava', 'Shuddha Guggulu'],
    benefits: ['Supports natural uric acid balance', 'Promotes joint comfort', 'Aids natural detoxification', 'Supports circulation'],
    dosage: '1-2 capsules twice daily with warm water after meals',
    quantity: '60 capsules (500mg each)',
    storage: 'Store in sealed container below 25°C. Keep away from moisture.',
    suitable_for: 'Adults seeking joint wellness support'
  },
  {
    id: 'gc-2',
    name: 'Arogya UricDown Powder',
    form: 'Herbal Powder (Churna)',
    category: 'Gout Care',
    image: '/catalogue/arogya-uricdown-powder.jpg',
    ingredients: ['Turmeric', 'Ginger', 'Neem', 'Punarnava', 'Guggulu'],
    benefits: ['Supports healthy uric acid levels', 'Promotes joint comfort', 'Aids natural detoxification', 'Supports circulation'],
    dosage: '1/2 teaspoon mixed with warm water twice daily',
    quantity: '200g',
    storage: 'Keep in sealed container in cool, dry place.',
    suitable_for: 'Adults over 18 years'
  },
  {
    id: 'gc-3',
    name: 'Arogya GoutRelief Oil',
    form: 'Oil',
    category: 'Gout Care',
    image: '/catalogue/arogya-goutrelief-oil.jpg',
    ingredients: ['Turmeric oil', 'Ginger oil', 'Wintergreen', 'Sesame oil base'],
    benefits: ['Supports joint comfort', 'Promotes local circulation', 'Soothes joint areas', 'Supports mobility'],
    dosage: 'Apply and massage on affected areas 2-3 times daily',
    quantity: '100ml',
    storage: 'Store in cool place away from direct sunlight.',
    suitable_for: 'Adults'
  },

  // Hair Care (3 products)
  {
    id: 'hc-1',
    name: 'Arogya HairVital Shampoo',
    form: 'Shampoo',
    category: 'Hair Care',
    image: '/catalogue/arogya-hairvital-shampoo.jpg',
    ingredients: ['Neem extract', 'Brahmi', 'Bhringraj', 'Amla extract', 'Coconut oil'],
    benefits: ['Gently cleanses hair', 'Supports scalp health', 'Maintains natural shine', 'Promotes hair nourishment'],
    dosage: 'Apply to wet hair, massage gently, rinse thoroughly',
    quantity: '200ml',
    storage: 'Store in cool place. Do not freeze. Best within 12 months of opening.',
    suitable_for: 'All hair types, gentle for daily use'
  },
  {
    id: 'hc-2',
    name: 'Arogya HairGrowth Oil',
    form: 'Oil',
    category: 'Hair Care',
    image: '/catalogue/arogya-hairgrowth-oil.jpg',
    ingredients: ['Brahmi oil', 'Bhringraj', 'Neem oil', 'Sesame oil', 'Amla'],
    benefits: ['Supports hair strength and thickness', 'Promotes scalp health', 'Maintains hair moisture', 'Reduces hair fall sensations'],
    dosage: 'Apply to scalp and hair, massage for 10-15 minutes, leave for 1-2 hours',
    quantity: '100ml',
    storage: 'Keep in cool place away from direct sunlight.',
    suitable_for: 'All hair types'
  },
  {
    id: 'hc-3',
    name: 'Arogya HairVital Gummies',
    form: 'Gummies',
    category: 'Hair Care',
    image: '/catalogue/arogya-hairvital-gummies.jpg',
    ingredients: ['Biotin', 'Brahmi extract', 'Amla extract', 'Neem extract', 'Natural flavors'],
    benefits: ['Supports hair strength', 'Promotes scalp health', 'Supports natural hair growth', 'Maintains hair vitality'],
    dosage: '2 gummies daily with meals',
    quantity: '60 gummies',
    storage: 'Keep in sealed container in cool place.',
    suitable_for: 'Adults and children above 6 years'
  },

  // Immunity Support (3 products)
  {
    id: 'is-1',
    name: 'Arogya ImmunoBoost Gummies',
    form: 'Gummies',
    category: 'Immunity Support',
    image: '/catalogue/arogya-immunoboost-gummies.jpg',
    ingredients: ['Turmeric extract', 'Ashwagandha extract', 'Amla extract', 'Ginger extract', 'Natural fruit flavors'],
    benefits: ['Supports natural immunity', 'Antioxidant support', 'Promotes seasonal wellness', 'Supports overall vitality'],
    dosage: '2 gummies daily with meals',
    quantity: '60 gummies',
    storage: 'Store in cool, dry place below 25°C. Keep away from moisture.',
    suitable_for: 'Adults and children above 6 years'
  },
  {
    id: 'is-2',
    name: 'Arogya ImmunoPlus Capsules',
    form: 'Capsules',
    category: 'Immunity Support',
    image: '/catalogue/arogya-immunoplus-capsules.jpg',
    ingredients: ['Ashwagandha', 'Turmeric (Curcuma longa)', 'Neem', 'Amalaki', 'Giloy'],
    benefits: ['Supports natural immune response', 'Antioxidant properties', 'Promotes wellness support', 'Aids natural resistance'],
    dosage: '1-2 capsules daily after meals with warm water',
    quantity: '60 capsules (500mg each)',
    storage: 'Cool, dry place below 25°C. Protected from direct sunlight.',
    suitable_for: 'Adults of all ages'
  },
  {
    id: 'is-3',
    name: 'Arogya ImmunoShield Syrup',
    form: 'Syrup',
    category: 'Immunity Support',
    image: '/catalogue/arogya-immunoshield-syrup.jpg',
    ingredients: ['Tulsi', 'Ashwagandha', 'Ginger', 'Turmeric', 'Amla', 'Honey base'],
    benefits: ['Supports natural immunity', 'Promotes seasonal wellness', 'Aids natural resistance', 'Supports overall vitality'],
    dosage: '1-2 tablespoons daily with warm water or milk',
    quantity: '200ml',
    storage: 'Store in cool place. Protect from direct sunlight.',
    suitable_for: 'Adults and children above 6 years'
  },

  // Joint Care (3 products)
  {
    id: 'jc-1',
    name: 'Arogya ArthroFlex Oil',
    form: 'Oil',
    category: 'Joint Care',
    image: '/catalogue/arogya-arthroflex-oil.jpg',
    ingredients: ['Turmeric (Curcuma longa)', 'Boswellia serrata', 'Ginger extract', 'Shallaki', 'Camphor'],
    benefits: ['Supports joint comfort', 'Promotes mobility', 'Soothes tired joints', 'Supports flexibility'],
    dosage: 'Apply 1-2cm on affected area, massage gently for 5-10 minutes, 2-3 times daily',
    quantity: '100ml',
    storage: 'Store in cool place below 25°C. Keep container tightly sealed.',
    suitable_for: 'Adults for topical use'
  },
  {
    id: 'jc-2',
    name: 'Arogya ArthroRelief Cream',
    form: 'Cream',
    category: 'Joint Care',
    image: '/catalogue/arogya-arthrorelief-cream.jpg',
    ingredients: ['Turmeric extract', 'Boswellia', 'Ginger oil', 'Menthol', 'Sesame oil base'],
    benefits: ['Supports joint comfort', 'Promotes mobility', 'Soothes joint areas', 'Supports flexibility'],
    dosage: 'Apply and massage on affected areas 2-3 times daily',
    quantity: '50g',
    storage: 'Store in cool place. Keep tightly closed.',
    suitable_for: 'Adults for topical use'
  },
  {
    id: 'jc-3',
    name: 'Arogya JointFlex Gummies',
    form: 'Gummies',
    category: 'Joint Care',
    image: '/catalogue/arogya-jointflex-gummies.jpg',
    ingredients: ['Glucosamine', 'Boswellia extract', 'Turmeric extract', 'Ginger extract', 'Natural flavors'],
    benefits: ['Supports joint health', 'Promotes flexibility', 'Supports natural comfort', 'Aids joint wellness'],
    dosage: '2 gummies daily with meals',
    quantity: '60 gummies',
    storage: 'Store in cool, dry place. Keep away from moisture.',
    suitable_for: 'Adults over 18 years'
  },

  // Men's Health (2 products - Shilajit-free)
  {
    id: 'mh-1',
    name: 'Arogya VitoHerb Capsules',
    form: 'Capsules',
    category: "Men's Health",
    image: '/catalogue/arogya-vitoherb-capsules.jpg',
    ingredients: ['Ashwagandha', 'Safed Musli', 'Gokshura', 'Tribulus terrestris', 'Saffron'],
    benefits: ['Supports male vitality and energy', 'Promotes endurance', 'Supports muscle strength', 'Aids overall wellness'],
    dosage: '1-2 capsules daily with warm milk after dinner',
    quantity: '60 capsules (500mg each)',
    storage: 'Store in sealed container below 25°C. Protect from light.',
    suitable_for: 'Adult men above 18 years'
  },
  {
    id: 'mh-2',
    name: 'Arogya PowerFizz',
    form: 'Effervescent Tablets',
    category: "Men's Health",
    image: '/catalogue/arogya-powerfizz.jpg',
    ingredients: ['Ashwagandha extract', 'Zinc gluconate', 'Panax Ginseng (plant extract)', 'B-Complex vitamins'],
    benefits: ['Supports vitality and stamina', 'Promotes energy levels', 'Supports muscle function', 'Aids overall performance'],
    dosage: '1 tablet dissolved in water daily',
    quantity: '30 tablets',
    storage: 'Keep in sealed container away from heat and moisture.',
    suitable_for: 'Adult men over 18 years'
  },

  // Migraine Support (3 products)
  {
    id: 'ms-1',
    name: 'Arogya MigraEase Tablets',
    form: 'Instant Tablets',
    category: 'Migraine Support',
    image: '/catalogue/arogya-migraease-tablets.jpg',
    ingredients: ['Ginger (Zingiber officinale)', 'Brahmi', 'Jatamansi', 'Shankhapushpi', 'Black pepper'],
    benefits: ['Supports natural head comfort', 'Promotes mental clarity', 'Aids relaxation', 'Supports overall wellness'],
    dosage: '1-2 tablets at onset or twice daily with water',
    quantity: '30 tablets (500mg each)',
    storage: 'Cool, dry place below 25°C. Protect from direct sunlight.',
    suitable_for: 'Adults over 18 years'
  },
  {
    id: 'ms-2',
    name: 'Arogya MigraEase Capsules',
    form: 'Capsules',
    category: 'Migraine Support',
    image: '/catalogue/arogya-migraease-capsules.jpg',
    ingredients: ['Brahmi', 'Jatamansi', 'Shankhapushpi', 'Ginger', 'Tulsi'],
    benefits: ['Supports natural head comfort', 'Promotes mental relaxation', 'Aids emotional balance', 'Supports overall wellness'],
    dosage: '1-2 capsules twice daily with warm water after meals',
    quantity: '60 capsules (500mg each)',
    storage: 'Store in sealed container below 25°C.',
    suitable_for: 'Adults over 18 years'
  },
  {
    id: 'ms-3',
    name: 'Arogya MigraCalm Roll-on Oil',
    form: 'Roll-on Oil',
    category: 'Migraine Support',
    image: '/catalogue/arogya-migracalm-oil.jpg',
    ingredients: ['Menthol', 'Ginger oil', 'Brahmi oil', 'Wintergreen', 'Lavender oil'],
    benefits: ['Supports head comfort', 'Promotes relaxation', 'Cools sensation', 'Supports natural ease'],
    dosage: 'Apply on temples and forehead, roll gently as needed',
    quantity: '10ml',
    storage: 'Store in cool place. Keep tightly closed.',
    suitable_for: 'Adults for topical use'
  },

  // Skin Care (3 products)
  {
    id: 'sc-1',
    name: 'Arogya GlowHerb Cream',
    form: 'Cream',
    category: 'Skin Care',
    image: '/catalogue/arogya-glowherb-cream.jpg',
    ingredients: ['Turmeric (Curcuma longa)', 'Neem', 'Aloe vera extract', 'Sandalwood', 'Saffron'],
    benefits: ['Supports natural skin radiance', 'Promotes skin clarity', 'Nourishes skin naturally', 'Supports healthy complexion'],
    dosage: 'Apply thin layer on clean face and neck daily morning and night',
    quantity: '50g',
    storage: 'Store in cool place. Keep container tightly closed.',
    suitable_for: 'All skin types'
  },
  {
    id: 'sc-2',
    name: 'Arogya AcneClear Face Wash',
    form: 'Face Wash',
    category: 'Skin Care',
    image: '/catalogue/arogya-acneclear-facewash.jpg',
    ingredients: ['Neem extract', 'Tea tree oil', 'Tulsi', 'Turmeric', 'Aloe vera'],
    benefits: ['Supports skin clarity', 'Gently cleanses pores', 'Promotes natural balance', 'Supports healthy skin'],
    dosage: 'Use twice daily - morning and night for best results',
    quantity: '100ml',
    storage: 'Store in cool place. Shake before use.',
    suitable_for: 'All skin types, especially acne-prone skin'
  },
  {
    id: 'sc-3',
    name: 'Arogya SkinGlow Capsules',
    form: 'Capsules',
    category: 'Skin Care',
    image: '/catalogue/arogya-skinglow-capsules.jpg',
    ingredients: ['Turmeric extract', 'Neem', 'Brahmi', 'Saffron', 'Aloe vera'],
    benefits: ['Supports skin radiance', 'Promotes skin clarity', 'Aids skin nourishment', 'Supports healthy complexion'],
    dosage: '1-2 capsules daily after meals with warm water',
    quantity: '60 capsules (500mg each)',
    storage: 'Store in sealed container below 25°C.',
    suitable_for: 'Adults seeking skin wellness support'
  },

  // Stress Management (3 products)
  {
    id: 'sm-1',
    name: 'Arogya CalmMind Capsules',
    form: 'Capsules',
    category: 'Stress Management',
    image: '/catalogue/arogya-calmmind-capsules.jpg',
    ingredients: ['Ashwagandha', 'Brahmi', 'Jatamansi', 'Lavender', 'Sandalwood'],
    benefits: ['Supports natural relaxation', 'Promotes mental calmness', 'Aids emotional balance', 'Supports sleep quality'],
    dosage: '1-2 capsules daily, preferably before bedtime with warm milk',
    quantity: '60 capsules (500mg each)',
    storage: 'Airtight container in cool, dry place.',
    suitable_for: 'Adults seeking stress support'
  },
  {
    id: 'sm-2',
    name: 'Arogya SleepWell Gummies',
    form: 'Gummies',
    category: 'Stress Management',
    image: '/catalogue/arogya-sleepwell-gummies.jpg',
    ingredients: ['Ashwagandha extract', 'Brahmi extract', 'Jatamansi', 'Lavender extract', 'Natural flavors'],
    benefits: ['Supports natural sleep', 'Promotes relaxation', 'Aids mental calm', 'Supports emotional wellness'],
    dosage: '2 gummies 30 minutes before bedtime',
    quantity: '60 gummies',
    storage: 'Keep in sealed container in cool place.',
    suitable_for: 'Adults for sleep wellness support'
  },
  {
    id: 'sm-3',
    name: 'Arogya CalmMind Head Massage Oil',
    form: 'Oil',
    category: 'Stress Management',
    image: '/catalogue/arogya-calmmind-oil.jpg',
    ingredients: ['Brahmi oil', 'Jatamansi oil', 'Lavender oil', 'Sesame oil base', 'Sandalwood'],
    benefits: ['Supports mental relaxation', 'Promotes calmness', 'Aids stress relief', 'Supports sleep quality'],
    dosage: 'Apply on scalp and temples, massage gently for 10-15 minutes before sleep',
    quantity: '100ml',
    storage: 'Store in cool place away from direct sunlight.',
    suitable_for: 'All ages'
  },

  // Weight Management (6 products)
  {
    id: 'wm-1',
    name: 'Arogya TrimHerb Tablets',
    form: 'Instant Tablets',
    category: 'Weight Management',
    image: '/catalogue/arogya-trimherb-tablets.jpg',
    ingredients: ['Triphala', 'Ginger', 'Black pepper', 'Guggulu', 'Garcinia cambogia'],
    benefits: ['Supports healthy weight management', 'Aids natural metabolism', 'Promotes digestive wellness', 'Supports satiety'],
    dosage: '1-2 tablets twice daily after meals with warm water',
    quantity: '30 tablets (1g each)',
    storage: 'Cool, dry place below 25°C. Keep away from moisture.',
    suitable_for: 'Adults with balanced diet and exercise'
  },
  {
    id: 'wm-2',
    name: 'Arogya FatBurn Capsules',
    form: 'Capsules',
    category: 'Weight Management',
    image: '/catalogue/arogya-fatburn-capsules.jpg',
    ingredients: ['Triphala', 'Ginger', 'Turmeric', 'Guggulu', 'Garcinia cambogia extract'],
    benefits: ['Supports healthy weight management', 'Aids natural metabolism', 'Promotes digestive wellness', 'Supports natural satiety'],
    dosage: '1-2 capsules twice daily with warm water after meals',
    quantity: '60 capsules (500mg each)',
    storage: 'Cool, dry place below 25°C. Protect from light and moisture.',
    suitable_for: 'Adults with balanced diet and exercise'
  },
  {
    id: 'wm-3',
    name: 'Arogya SlimTea Powder',
    form: 'Tea Powder',
    category: 'Weight Management',
    image: '/catalogue/arogya-slimtea-powder.jpg',
    ingredients: ['Green tea extract', 'Ginger', 'Turmeric', 'Cinnamon', 'Fennel'],
    benefits: ['Supports healthy metabolism', 'Promotes digestive wellness', 'Aids natural cleansing', 'Supports satiety'],
    dosage: '1 teaspoon in warm water, consume daily morning or evening',
    quantity: '100g',
    storage: 'Store in sealed container away from heat and moisture.',
    suitable_for: 'Adults with balanced diet and exercise'
  },
  {
    id: 'wm-4',
    name: 'Arogya SlimDetox Powder',
    form: 'Herbal Powder (Churna)',
    category: 'Weight Management',
    image: '/catalogue/arogya-slimdetox-powder.jpg',
    ingredients: ['Triphala', 'Ginger', 'Turmeric', 'Fennel', 'Black pepper'],
    benefits: ['Supports natural detoxification', 'Aids digestive wellness', 'Promotes natural cleansing', 'Supports weight management'],
    dosage: '1/2 teaspoon in warm water every morning on empty stomach',
    quantity: '150g',
    storage: 'Keep in sealed container away from heat and moisture.',
    suitable_for: 'Adults with balanced diet and exercise'
  },
  {
    id: 'wm-5',
    name: 'Arogya MetaboBoost Gummies',
    form: 'Gummies',
    category: 'Weight Management',
    image: '/catalogue/arogya-metaboboost-gummies.jpg',
    ingredients: ['Garcinia cambogia extract', 'Ginger extract', 'Turmeric extract', 'Green tea extract', 'Natural flavors'],
    benefits: ['Supports healthy metabolism', 'Aids weight management', 'Promotes energy levels', 'Supports overall wellness'],
    dosage: '2 gummies daily with meals',
    quantity: '60 gummies',
    storage: 'Store in cool, dry place below 25°C.',
    suitable_for: 'Adults with balanced diet and exercise'
  },
  {
    id: 'wm-6',
    name: 'Arogya DetoxSlim Capsules',
    form: 'Capsules',
    category: 'Weight Management',
    image: '/catalogue/arogya-detoxslim-capsules.jpg',
    ingredients: ['Detox blend', 'Garcinia cambogia', 'Ginger', 'Turmeric', 'Green tea extract'],
    benefits: ['Supports natural detoxification', 'Aids weight management', 'Promotes digestive wellness', 'Supports natural cleansing'],
    dosage: '1-2 capsules daily with warm water after meals',
    quantity: '60 capsules (500mg each)',
    storage: 'Store in sealed container below 25°C.',
    suitable_for: 'Adults with balanced diet and exercise'
  }
]

const categories = [
  'Bone Health',
  'Detoxification & Liver Support',
  'Digestion Support',
  'Gout Care',
  'Hair Care',
  'Immunity Support',
  'Joint Care',
  "Men's Health",
  'Migraine Support',
  'Skin Care',
  'Stress Management',
  'Weight Management'
]

export default function CataloguePage() {
  const [expandedProducts, setExpandedProducts] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0])

  const toggleProduct = (id: string) => {
    const newExpanded = new Set(expandedProducts)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedProducts(newExpanded)
  }

  const filteredProducts = products.filter(p => p.category === selectedCategory)

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-br from-primary/5 to-accent/5 py-16 md:py-20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Arogya Bio</h1>
            <p className="text-xl text-muted-foreground mb-2">Premium Ayurvedic Wellness Catalogue</p>
            <p className="text-lg text-muted-foreground font-light">
              Authentic herbal formulations for everyday wellness. 
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-0 bg-white border-b border-border z-40">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 whitespace-nowrap font-medium transition-all border-b-2 ${
                  selectedCategory === cat
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground border-transparent hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{selectedCategory}</h2>
          </div>

          <div className="space-y-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors">
                <button
                  onClick={() => toggleProduct(product.id)}
                  className="w-full p-6 flex items-center gap-6 hover:bg-secondary/30 transition-colors text-left"
                >
                  <div className="w-32 h-32 flex-shrink-0 bg-secondary/10 rounded-lg overflow-hidden border border-border">
                    <img 
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.svg' }}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{product.form}</p>
                        <h3 className="text-xl font-bold text-foreground mb-2">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {product.benefits.slice(0, 2).join(' • ')}
                        </p>
                        <p className="text-sm font-semibold text-foreground">{product.quantity}</p>
                      </div>
                      <ChevronDown 
                        className={`w-6 h-6 text-primary flex-shrink-0 transition-transform ${
                          expandedProducts.has(product.id) ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </div>
                </button>

                {expandedProducts.has(product.id) && (
                  <div className="px-6 pb-6 border-t border-border pt-6 bg-secondary/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-foreground mb-3">Key Ingredients</h4>
                        <ul className="space-y-2 mb-6">
                          {product.ingredients.map((ing, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">✓</span>
                              {ing}
                            </li>
                          ))}
                        </ul>

                        <h4 className="font-bold text-foreground mb-3">Functional Benefits</h4>
                        <ul className="space-y-2">
                          {product.benefits.map((benefit, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-bold text-foreground mb-3">Direction for Use</h4>
                        <p className="text-sm text-muted-foreground mb-6 p-3 bg-white rounded border border-border">{product.dosage}</p>

                        {product.suitable_for && (
                          <>
                            <h4 className="font-bold text-foreground mb-3">Suitable For</h4>
                            <p className="text-sm text-muted-foreground mb-6">{product.suitable_for}</p>
                          </>
                        )}

                        <h4 className="font-bold text-foreground mb-3">Storage Instructions</h4>
                        <p className="text-sm text-muted-foreground p-3 bg-white rounded border border-border">{product.storage}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-xs text-muted-foreground">
                        <span className="font-semibold">Disclaimer:</span> These statements have not been evaluated. This product is not intended to diagnose, treat, cure, or prevent any disease. Please consult a healthcare practitioner.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
