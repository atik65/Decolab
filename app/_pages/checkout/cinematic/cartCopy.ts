/** Extra copy for the cart sheet (the rest comes from coCopy). */
export const cartCopy = {
  en: {
    title: "Your cart",
    banner: "Free delivery & installation on every order",
    checkout: "Proceed to checkout",
    keepShopping: "Continue shopping",
    browseTitle: "Start with a favourite",
    categories: [
      { label: "House numbers", href: "/shop?category=House%20Numbers" },
      { label: "Diwaniya", href: "/shop?category=Diwaniya" },
      { label: "Islamic phrases", href: "/shop?category=Islamic%20Phrases" },
    ],
    cartLabel: "Open cart",
  },
  ar: {
    title: "سلتك",
    banner: "توصيل وتركيب مجاني مع كل طلب",
    checkout: "المتابعة إلى إتمام الطلب",
    keepShopping: "مواصلة التسوق",
    browseTitle: "ابدأ بأحد المفضلات",
    categories: [
      { label: "أرقام المنازل", href: "/shop?category=House%20Numbers" },
      { label: "الديوانية", href: "/shop?category=Diwaniya" },
      { label: "عبارات إسلامية", href: "/shop?category=Islamic%20Phrases" },
    ],
    cartLabel: "افتح السلة",
  },
} as const;
