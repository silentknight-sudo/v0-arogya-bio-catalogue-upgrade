// Gout Health Combo Products Data - Bilingual (Hindi & English)

export interface Product {
  id: string
  name: string
  nameHi: string
  description: string
  descriptionHi: string
  benefits: string[]
  benefitsHi: string[]
  ingredients: string[]
  ingredientsHi: string[]
  usage: string
  usageHi: string
  type: "oil" | "capsules"
}

export interface ComboOffer {
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  title: string
  titleHi: string
  description: string
  descriptionHi: string
}

export const goutHealthOil: Product = {
  id: "gout-oil",
  name: "Gout Health Oil",
  nameHi: "गाउट हेल्थ ऑयल",
  description:
    "Premium Ayurvedic oil specially formulated to provide rapid relief from gout pain and inflammation. This powerful blend of natural ingredients and ancient herbs works topically to reduce swelling, improve mobility, and restore joint health. Clinically proven to provide relief within 2 weeks of regular use.",
  descriptionHi:
    "गाउट दर्द और सूजन से तेजी से राहत देने के लिए विशेष रूप से तैयार किया गया प्रीमियम आयुर्वेदिक तेल। प्राकृतिक सामग्री और प्राचीन जड़ी-बूटियों का यह शक्तिशाली मिश्रण बाहरी रूप से लगाने पर सूजन को कम करता है, गतिविधि में सुधार करता है और जोड़ों के स्वास्थ्य को बहाल करता है। नियमित उपयोग के 2 सप्ताह में राहत देने के लिए नैदानिक रूप से सिद्ध।",
  benefits: [
    "Reduces joint inflammation and swelling",
    "Provides fast-acting pain relief",
    "Improves blood circulation to affected areas",
    "Restores joint mobility and flexibility",
    "Contains 100% natural Ayurvedic ingredients",
    "No side effects or harmful chemicals",
    "Suitable for daily use",
    "Certified and lab tested",
  ],
  benefitsHi: [
    "जोड़ों की सूजन और सूजन को कम करता है",
    "तेजी से काम करने वाली दर्द निवारण प्रदान करता है",
    "प्रभावित क्षेत्रों में रक्त परिसंचरण में सुधार करता है",
    "जोड़ों की गतिविधि और लचीलेपन को बहाल करता है",
    "100% प्राकृतिक आयुर्वेदिक सामग्री शामिल है",
    "कोई दुष्प्रभाव या हानिकारक रसायन नहीं",
    "दैनिक उपयोग के लिए उपयुक्त",
    "प्रमाणित और प्रयोगशाला परीक्षित",
  ],
  ingredients: [
    "Ashwagandha",
    "Turmeric (Curcumin)",
    "Neem Oil",
    "Sesame Oil",
    "Eucalyptus",
    "Camphor",
    "Guggul",
    "Brahmi",
  ],
  ingredientsHi: [
    "अश्वगंधा",
    "हल्दी (करक्यूमिन)",
    "नीम का तेल",
    "तिल का तेल",
    "यूकेलिप्टस",
    "कपूर",
    "गुग्गुल",
    "ब्राह्मी",
  ],
  usage:
    "Apply 2-3 tablespoons of oil to the affected joint area. Gently massage in circular motions for 5-10 minutes. Use 2-3 times daily for best results. Can be used with warm water compress for enhanced relief.",
  usageHi:
    "प्रभावित जोड़ों के क्षेत्र पर 2-3 चम्मच तेल लगाएं। गोलाकार गति में धीरे-धीरे मसाज करें 5-10 मिनट के लिए। सर्वोत्तम परिणामों के लिए दिन में 2-3 बार उपयोग करें। बेहतर राहत के लिए गर्म पानी की सिकाई के साथ इस्तेमाल किया जा सकता है।",
  type: "oil",
}

export const goutHealthCapsules: Product = {
  id: "gout-capsules",
  name: "Gout Health Capsules",
  nameHi: "गाउट हेल्थ कैप्सूल",
  description:
    "Advanced Ayurvedic capsules designed to address gout from within. These powerful herbal formulations work to regulate uric acid levels, reduce inflammation, and strengthen joint tissues. Each capsule contains a concentrated blend of 12+ potent Ayurvedic herbs that work synergistically to provide lasting relief from gout symptoms and prevent future flare-ups.",
  descriptionHi:
    "गाउट को अंदर से दूर करने के लिए डिजाइन किए गए उन्नत आयुर्वेदिक कैप्सूल। ये शक्तिशाली हर्बल फॉर्मूलेशन यूरिक एसिड के स्तर को नियंत्रित करने, सूजन को कम करने और जोड़ों के ऊतकों को मजबूत करने के लिए काम करते हैं। प्रत्येक कैप्सूल में 12+ शक्तिशाली आयुर्वेदिक जड़ी-बूटियों का केंद्रित मिश्रण है जो गाउट के लक्षणों से स्थायी राहत प्रदान करते हैं और भविष्य के दौरों को रोकते हैं।",
  benefits: [
    "Regulates and maintains healthy uric acid levels",
    "Reduces acute gout attacks and flare-ups",
    "Strengthens joint tissues and cartilage",
    "Improves overall mobility and flexibility",
    "Supports kidney function for better detoxification",
    "Anti-inflammatory and pain relief",
    "Prevents recurring gout symptoms",
    "100% natural without side effects",
  ],
  benefitsHi: [
    "स्वस्थ यूरिक एसिड के स्तर को नियंत्रित और बनाए रखता है",
    "तीव्र गाउट के दौरों और दौरों को कम करता है",
    "जोड़ों के ऊतकों और उपास्थि को मजबूत करता है",
    "समग्र गतिविधि और लचीलेपन में सुधार करता है",
    "बेहतर विषहरण के लिए किडनी के कार्य का समर्थन करता है",
    "विरोधी भड़काऊ और दर्द निवारण",
    "गाउट के लक्षणों की पुनरावृत्ति को रोकता है",
    "दुष्प्रभाव के बिना 100% प्राकृतिक",
  ],
  ingredients: [
    "Chervi (Celery Seeds)",
    "Guggul",
    "Turmeric",
    "Neem",
    "Cinnamon",
    "Ginger",
    "Fenugreek",
    "Ajwain",
    "Punarnava",
    "Triphala",
    "Ashwagandha",
    "Brahmi",
  ],
  ingredientsHi: [
    "चेरवी (अजवाइन के बीज)",
    "गुग्गुल",
    "हल्दी",
    "नीम",
    "दालचीनी",
    "अदरक",
    "मेथी",
    "अजवाइन",
    "पुनर्नवा",
    "त्रिफला",
    "अश्वगंधा",
    "ब्राह्मी",
  ],
  usage:
    "Take 1-2 capsules with warm water after meals, twice daily. For best results, continue for 60-90 days. Consult your healthcare provider for personalized dosage recommendations.",
  usageHi:
    "भोजन के बाद गर्म पानी के साथ 1-2 कैप्सूल लें, दिन में दो बार। सर्वोत्तम परिणामों के लिए 60-90 दिन तक जारी रखें। व्यक्तिगत खुराक की सिफारिशों के लिए अपने स्वास्थ्य सेवा प्रदाता से परामर्श लें।",
  type: "capsules",
}

export const comboOffer: ComboOffer = {
  originalPrice: 2499,
  discountedPrice: 1999,
  discountPercentage: 20,
  title: "Gout Health Complete Care Combo",
  titleHi: "गाउट हेल्थ कम्पलीट केयर कॉम्बो",
  description:
    "Get both our premium Gout Health Oil and advanced Gout Health Capsules at an incredible 20% discount! This powerful combination provides complete relief - topical oil for immediate pain relief and capsules for long-term uric acid management and prevention.",
  descriptionHi:
    "हमारे प्रीमियम गाउट हेल्थ ऑयल और उन्नत गाउट हेल्थ कैप्सूल दोनों को अविश्वसनीय 20% छूट पर प्राप्त करें! यह शक्तिशाली संयोजन पूर्ण राहत प्रदान करता है - तत्काल दर्द राहत के लिए बाहरी तेल और दीर्घकालिक यूरिक एसिड प्रबंधन और रोकथाम के लिए कैप्सूल।",
}

export const whyCombo = {
  title: "Why Choose the Gout Health Combo?",
  titleHi: "गाउट हेल्थ कॉम्बो क्यों चुनें?",
  reasons: [
    {
      title: "Complete Care Approach",
      titleHi: "संपूर्ण देखभाल दृष्टिकोण",
      description: "Oil works externally for immediate relief, capsules work internally for lasting cure",
      descriptionHi: "तेल बाहरी रूप से तत्काल राहत के लिए काम करता है, कैप्सूल आंतरिक रूप से स्थायी इलाज के लिए काम करते हैं",
    },
    {
      title: "Maximum Savings",
      titleHi: "अधिकतम बचत",
      description: "Save ₹500 with our combo offer - 20% discount on total price",
      descriptionHi: "हमारे कॉम्बो ऑफर के साथ ₹500 बचाएं - कुल कीमत पर 20% छूट",
    },
    {
      title: "Faster Results",
      titleHi: "तेजी से परिणाम",
      description: "Combination therapy provides faster symptom relief and better long-term outcomes",
      descriptionHi: "संयोजन चिकित्सा तेजी से लक्षण राहत और बेहतर दीर्घकालीन परिणाम प्रदान करता है",
    },
    {
      title: "Proven Efficacy",
      titleHi: "सिद्ध प्रभावकारिता",
      description: "Trusted by 10,000+ customers with 4.9/5 rating - proven to work",
      descriptionHi: "10,000+ ग्राहकों द्वारा विश्वसनीय 4.9/5 रेटिंग के साथ - काम करने के लिए सिद्ध",
    },
  ],
}
