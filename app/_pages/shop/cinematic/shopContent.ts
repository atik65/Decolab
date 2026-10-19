import { heroSlides } from "../../home/cinematic/content";

export const shopCopy = {
  en: {
    kicker: "The collection",
    heroLines: ["Every piece,", "made to glow."],
    heroBody:
      "Illuminated signage, LED house numbers and 3D letters — designed to your size and style, then produced and installed in Kuwait.",
    categoryBody:
      "Every piece in this collection is customised to your size and style, then produced and installed by our team.",
    browse: "Browse collection",
    custom: "Order a custom piece",
    noteTitle: "Included with every order",
    notes: ["Free delivery & installation", "Custom sizes, colours & fonts", "Made in our Kuwait workshop"],
    sectionTitle: "Collection",
    all: "All",
    search: "Search products",
    clearSearch: "Clear search",
    sort: "Sort",
    sortOptions: {
      recommended: "Recommended",
      newest: "Newest",
      priceAsc: "Price: low to high",
      priceDesc: "Price: high to low",
    },
    columns: "Columns",
    piece: "piece",
    pieces: "pieces",
    forQuery: "for",
    inCategory: "in",
    reset: "Reset filters",
    emptyTitle: "Nothing matches that — yet.",
    emptyBody:
      "Try another word or category. Or tell us what you have in mind and we'll design it for you.",
    errorTitle: "We couldn't load the collection.",
    errorBody: "Please check your connection and try again.",
    retry: "Try again",
    customTitle: "Can't find your design? We'll make it.",
    promisesKicker: "Why Decolab",
    promisesTitle: "Crafted properly. Delivered and installed for you.",
    promises: [
      {
        t: "Free delivery & installation",
        b: "Your order arrives and is installed by our team at no extra cost.",
      },
      {
        t: "Made to measure",
        b: "Choose the size, colour, font and lighting — every piece is customised.",
      },
      {
        t: "Quality materials",
        b: "High-quality materials, finished in our own Shuwaikh workshop.",
      },
      {
        t: "Fast turnaround",
        b: "Quick production and guaranteed, professional installation.",
      },
    ],
  },
  ar: {
    kicker: "المجموعة",
    heroLines: ["كل قطعة", "صُنعت لتضيء."],
    heroBody:
      "لافتات مضيئة وأرقام منازل LED وحروف ثلاثية الأبعاد — بالمقاس والتصميم الذي تريده، نصنعها ونركّبها لك في الكويت.",
    categoryBody:
      "كل قطعة في هذه المجموعة تُصمَّم حسب مقاسك وذوقك، ثم يصنعها فريقنا ويركّبها لك.",
    browse: "تصفح المجموعة",
    custom: "اطلب تصميمًا مخصصًا",
    noteTitle: "مع كل طلب",
    notes: ["توصيل وتركيب مجاني", "مقاسات وألوان وخطوط حسب الطلب", "صنع في ورشتنا بالكويت"],
    sectionTitle: "المجموعة",
    all: "الكل",
    search: "ابحث عن منتج",
    clearSearch: "مسح البحث",
    sort: "الترتيب",
    sortOptions: {
      recommended: "الموصى به",
      newest: "الأحدث",
      priceAsc: "السعر: من الأقل إلى الأعلى",
      priceDesc: "السعر: من الأعلى إلى الأقل",
    },
    columns: "الأعمدة",
    piece: "قطعة",
    pieces: "قطع",
    forQuery: "عن",
    inCategory: "في",
    reset: "إعادة الضبط",
    emptyTitle: "لا يوجد ما يطابق بحثك — بعد.",
    emptyBody:
      "جرّب كلمة أو فئة أخرى. أو أخبرنا بما تتخيله ونحن نصممه لك.",
    errorTitle: "تعذّر تحميل المجموعة.",
    errorBody: "تحقق من اتصالك بالإنترنت وحاول مرة أخرى.",
    retry: "حاول مرة أخرى",
    customTitle: "لم تجد التصميم الذي تريده؟ سنصنعه لك.",
    promisesKicker: "لماذا ديكولاب",
    promisesTitle: "صناعة متقنة. توصيل وتركيب علينا.",
    promises: [
      {
        t: "توصيل وتركيب مجاني",
        b: "طلبك يصلك ويركّبه فريقنا دون أي تكلفة إضافية.",
      },
      {
        t: "حسب الطلب",
        b: "اختر المقاس واللون والخط والإضاءة — كل قطعة مخصصة لك.",
      },
      {
        t: "مواد عالية الجودة",
        b: "مواد عالية الجودة وتشطيب في ورشتنا في الشويخ.",
      },
      {
        t: "تسليم سريع",
        b: "إنتاج سريع وتركيب احترافي مضمون.",
      },
    ],
  },
} as const;

/** Hero photo that best matches the selected category (falls back to the first slide). */
export function heroIndexFor(category: string): number {
  const c = decodeURIComponent(category || "").trim().toLowerCase();
  if (!c) return 0;
  const hit = heroSlides.findIndex((s) => {
    const k = s.category.toLowerCase();
    return c.includes(k) || k.includes(c);
  });
  return hit === -1 ? 0 : hit;
}
