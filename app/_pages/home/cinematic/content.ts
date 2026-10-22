export type Locale = "en" | "ar";

export const WHATSAPP_NUMBER = "96566889159";
export const WHATSAPP_URL = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}`;

/** Local photos used as fallbacks and for the showcase scenes. */
const P = "/products";

export interface HeroSlide {
  src: string;
  position: string;
  /** shop category to link the caption to */
  category: string;
  en: string;
  ar: string;
}

export const heroSlides: HeroSlide[] = [
  {
    src: "/images/home/banner8.jpg",
    position: "50% 46%",
    category: "Diwaniya",
    en: "Illuminated 3D lettering",
    ar: "حروف مضيئة ثلاثية الأبعاد",
  },
  {
    src: "/images/home/banner14.jpg",
    position: "50% 52%",
    category: "House Numbers",
    en: "Custom house numbers",
    ar: "أرقام منازل مخصصة",
  },
  {
    src: "/images/home/banner9.jpg",
    position: "50% 30%",
    category: "Islamic Phrases",
    en: "Islamic phrases & plaques",
    ar: "عبارات ولوحات إسلامية",
  },
];

export const heroPhotos = [
  `${P}/house-numbers/13.jpeg`,
  `${P}/font-design/12.jpeg`,
  `${P}/font-design/30.jpeg`,
  `${P}/on-the-floor/2.jpeg`,
];

export const fallbackCategories = [
  {
    id: -1,
    name: "House Numbers",
    name_ar: "أرقام المنزل",
    image: `${P}/house-numbers/10.jpeg`,
  },
  {
    id: -2,
    name: "Islamic Phrases",
    name_ar: "عبارات اسلامية",
    image: `${P}/font-design/32.jpeg`,
  },
  {
    id: -3,
    name: "Numbers",
    name_ar: "أرقام",
    image: `${P}/house-numbers/9.jpeg`,
  },
  {
    id: -4,
    name: "Diwaniya",
    name_ar: "الديوانية",
    image: `${P}/font-design/30.jpeg`,
  },
];

/** Used when a remote (API) image fails to load. */
export const fallbackImages = [
  `${P}/house-numbers/10.jpeg`,
  `${P}/font-design/12.jpeg`,
  `${P}/house-numbers/9.jpeg`,
  `${P}/font-design/30.jpeg`,
  `${P}/house-numbers/13.jpeg`,
  `${P}/on-the-floor/2.jpeg`,
];

export const copy = {
  en: {
    wordSub: "Illuminated signage · LED house numbers · 3D letters",
    heroTitle: "Light up your address.",
    heroLines: ["Illuminated signage", "& custom house numbers"],
    heroBody:
      "Designed, produced and installed in Kuwait — from LED house numbers and 3D letters to storefront signage.",
    shop: "Shop now",
    ourWork: "Our work",
    viewCollection: "View collection",
    scroll: "Scroll",
    latest: "Latest work",
    freeTitle: "Free delivery & installation",
    freeBody: "Your order arrives and gets installed at no extra cost.",
    villa: "VILLA",
    statementKicker: "About Decolab",
    statement:
      "Specialists in manufacturing *house numbers*, *advertising signs*, traditional guest houses, chalets, farms, and *“Mashallah” signs*.",
    statementBody:
      "Kuwait-based advertising company specializing in illuminated signage, LED house numbers, acrylic 3D letters, and custom printing and installation — with high-quality materials and fast installation guaranteed.",
    aboutCta: "Our story",
    services: [
      "Illuminated signage",
      "LED house numbers",
      "Acrylic 3D letters",
      "Custom printing & installation",
    ],
    badge: "Illuminated signage • LED house numbers • ",
    catTitle: "Services by Category",
    catCount: "collections",
    viewAll: "View all",
    explore: "Explore",
    prodTitle: "Featured products",
    from: "From",
    kd: "KD",
    details: "View details",
    moreTitle: "Explore the full collection",
    scenesGlassTitle: "Decolab team is always available for personal advice",
    scenesGlassCta: "Chat on WhatsApp",
    ctaKicker: "Let's talk",
    ctaTitle: "Ready to light up your space?",
    ctaBody:
      "Tell us what you have in mind — we'll design it, make it and install it.",
    ctaWhatsapp: "Message us on WhatsApp",
    ctaShop: "Browse the shop",
    marquee: "Light up your address",
  },
  ar: {
    wordSub: "لافتات مضيئة · أرقام منازل LED · حروف ثلاثية الأبعاد",
    heroTitle: "أضئ عنوانك.",
    heroLines: ["لافتات مضيئة", "وأرقام منازل بتصميم مخصص"],
    heroBody:
      "تصميم وتصنيع وتركيب في الكويت — من أرقام المنازل LED والحروف ثلاثية الأبعاد إلى لافتات الواجهات.",
    shop: "تسوق الآن",
    ourWork: "أعمالنا",
    viewCollection: "عرض المجموعة",
    scroll: "مرر",
    latest: "أحدث أعمالنا",
    freeTitle: "توصيل وتركيب مجاني",
    freeBody: "طلبك يصلك ويُركَّب دون أي تكلفة إضافية.",
    villa: "فيلا",
    statementKicker: "عن ديكولاب",
    statement:
      "متخصصون في تصنيع *أرقام المنازل* و*اللوحات الإعلانية* ولوحات الديوانيات والمزارع والشاليهات، ولوحات *«ما شاء الله»*.",
    statementBody:
      "شركة دعاية وإعلان كويتية متخصصة في اللافتات المضيئة وأرقام المنازل LED والحروف ثلاثية الأبعاد من الأكريليك، والطباعة والتركيب المخصص — بمواد عالية الجودة وخدمة تركيب سريعة مضمونة.",
    aboutCta: "قصتنا",
    services: [
      "لافتات مضيئة",
      "أرقام منازل LED",
      "حروف أكريليك ثلاثية الأبعاد",
      "طباعة وتركيب مخصص",
    ],
    badge: "لافتات مضيئة • أرقام منازل LED • ",
    catTitle: "تسوق حسب الفئة",
    catCount: "مجموعات",
    viewAll: "عرض الكل",
    explore: "استكشف",
    prodTitle: "منتجات مميزة",
    from: "من",
    kd: "KD",
    details: "مشاهدة التفاصيل",
    moreTitle: "استكشف المجموعة الكاملة",
    scenesGlassTitle: "فريق ديكولاب متاح دائماً لتقديم المشورة الشخصية",
    scenesGlassCta: "تحدث عبر واتساب",
    ctaKicker: "لنتحدث",
    ctaTitle: "جاهز لتضيء مساحتك؟",
    ctaBody: "أخبرنا بما تتخيله — نحن نصممه ونصنعه ونركّبه لك.",
    ctaWhatsapp: "راسلنا عبر واتساب",
    ctaShop: "تصفح المتجر",
    marquee: "أضئ عنوانك",
  },
} as const;

export const contact = {
  phone: "+965 6688 9159",
  address: {
    en: "Shuwaikh Industrial Area 1 Plot: 1, Parcel: 79C, Street: 19",
    ar: "شويخ الصناعية 1، قطعة 1، قسيمة 79C، شارع 19",
  },
};
