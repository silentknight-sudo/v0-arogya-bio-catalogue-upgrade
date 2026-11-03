// Single source of truth for what Arogya Bio currently sells.
// The storefront only shows these two products (+ the combo).
// To swap photos, overwrite the files in /public/products with the same names.

import { goutHealthOil, goutHealthCapsules, comboOffer } from "@/lib/combo-products"

export const OIL_IMG = "/products/gouthealth-oil.png"
export const CAPS_IMG = "/products/gouthealth-capsules.png"
export const HERO_BG = "/products/gouthealth-lifestyle.jpg"
export const BANNER_IMG = "/products/gouthealth-banner.png"

export const OIL_GALLERY = [OIL_IMG, "/products/gouthealth-oil-back.png"]
export const CAPS_GALLERY = [
  CAPS_IMG,
  "/products/gouthealth-capsules-composition.png",
  "/products/gouthealth-capsules-back.png",
]

export const storeProducts = [
  {
    ...goutHealthOil,
    name: "Gouthealth Oil",
    size: "100 ml",
    use: "For external use only",
    image: OIL_IMG,
    gallery: OIL_GALLERY,
    composition: [
      { herb: "Shallaki", note: "Traditionally used in joint care" },
      { herb: "Nirgundi", note: "Known in Ayurveda for joint wellness" },
      { herb: "Ashwagandha", note: "Supports an active lifestyle" },
    ],
  },
  {
    ...goutHealthCapsules,
    name: "Gouthealth Capsules",
    size: "30 capsules · 500 mg",
    use: "Ayurvedic medicine for internal use",
    image: CAPS_IMG,
    gallery: CAPS_GALLERY,
    usage: "One capsule a day, or as directed by the physician. Store in a cool, dark and dry place.",
    composition: [
      { herb: "Shallaki (Salai Guggul)", note: "100 mg" },
      { herb: "Nirgundi (Vitex negundo)", note: "80 mg" },
      { herb: "Rasna (Pluchea lanceolata)", note: "80 mg" },
      { herb: "Ashwagandha (Withania somnifera)", note: "70 mg" },
      { herb: "Giloy (Tinospora cordifolia)", note: "70 mg" },
      { herb: "Ginger (Zingiber officinale)", note: "50 mg" },
      { herb: "Arandi (Ricinus communis)", note: "50 mg" },
    ],
  },
]

export type StoreProduct = (typeof storeProducts)[number]

export const getStoreProduct = (id: string) => storeProducts.find((p) => p.id === id)

export const COMBO_CHECKOUT_URL = "/checkout?combo=gout-health-combo"

/** True for DB products that are one of the two products we sell. */
export const isStoreProduct = (name = "") => /gout/i.test(name)

export { comboOffer }
