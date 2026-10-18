const P = "/products";

export interface SceneCopy {
  tag: string;
  title: string;
  body: string;
  specs: string[];
}

export interface Scene {
  photos: string[];
  /** shop category the CTA links to */
  category: string;
  en: SceneCopy;
  ar: SceneCopy;
}

export const scenes: Scene[] = [
  {
    photos: [
      `${P}/house-numbers/13.jpeg`,
      `${P}/house-numbers/10.jpeg`,
      `${P}/house-numbers/9.jpeg`,
    ],
    category: "House Numbers",
    en: {
      tag: "House numbers",
      title: "Custom house numbers that glow after dark",
      body: "Backlit and halo-lit numbers, cut and finished to match your facade.",
      specs: [
        "Choose size, font, design and light colour",
        "Wall, floor or parking-shade mounting",
        "Free delivery & installation",
      ],
    },
    ar: {
      tag: "أرقام المنازل",
      title: "أرقام منازل مخصصة تتوهج مع حلول الظلام",
      body: "أرقام مضيئة بإضاءة خلفية، مقصوصة ومشطّبة لتناسب واجهة منزلك.",
      specs: [
        "اختر الحجم والخط والتصميم ولون الإضاءة",
        "تركيب على الحائط أو الأرض أو مظلة السيارة",
        "توصيل وتركيب مجاني",
      ],
    },
  },
  {
    photos: [
      `${P}/font-design/21.jpeg`,
      `${P}/font-design/22.jpeg`,
      `${P}/font-design/27.jpeg`,
    ],
    category: "Advertisement Signage",
    en: {
      tag: "Signage",
      title: "Storefront signage that stands out on the street",
      body: "Illuminated signs built to be seen from the road, day and night.",
      specs: [
        "Illuminated and non-illuminated signs",
        "Custom printing of banners and stickers",
        "Fast installation by our own team",
      ],
    },
    ar: {
      tag: "لافتات",
      title: "لافتات واجهات تفرض حضورها في الشارع",
      body: "لافتات مضيئة صُنعت لتُرى من الطريق، نهاراً وليلاً.",
      specs: [
        "لافتات مضيئة وغير مضيئة",
        "طباعة مخصصة للبنرات والملصقات",
        "تركيب سريع بواسطة فريقنا",
      ],
    },
  },
  {
    photos: [
      `${P}/font-design/30.jpeg`,
      `${P}/font-design/12.jpeg`,
      `${P}/font-design/11.jpeg`,
    ],
    category: "Diwaniya",
    en: {
      tag: "3D letters",
      title: "3D letters with depth, from diwaniya names to phrases",
      body: "Acrylic and metal letters finished with warm backlighting.",
      specs: [
        "Acrylic and metal 3D letters",
        "Diwaniya names and Islamic phrases",
        "Backlit and halo-lit finishes",
      ],
    },
    ar: {
      tag: "حروف ثلاثية الأبعاد",
      title: "حروف ثلاثية الأبعاد بعمق ودفء، من أسماء الديوانيات إلى العبارات",
      body: "حروف من الأكريليك والمعدن بإضاءة خلفية دافئة.",
      specs: [
        "حروف أكريليك ومعدن ثلاثية الأبعاد",
        "أسماء الديوانيات والعبارات الإسلامية",
        "تشطيبات بإضاءة خلفية",
      ],
    },
  },
  {
    photos: [
      `${P}/on-car-awnings/1.jpeg`,
      `${P}/on-the-floor/2.jpeg`,
      `${P}/box-on-the-wall/6.jpeg`,
    ],
    category: "House Numbers",
    en: {
      tag: "Installation",
      title: "Designed, made and installed for any placement",
      body: "Wall, floor stand or parking shade — one team from design to installation.",
      specs: [
        "Box on the wall, on the floor or on parking shade",
        "Delivery and installation included",
        "Message us on WhatsApp for a quote",
      ],
    },
    ar: {
      tag: "التركيب",
      title: "تصميم وتصنيع وتركيب لأي موضع",
      body: "على الحائط أو الأرض أو مظلة السيارة — فريق واحد من التصميم إلى التركيب.",
      specs: [
        "صندوق على الحائط أو الأرض أو مظلة السيارة",
        "التوصيل والتركيب مشمولان",
        "راسلنا عبر واتساب للحصول على عرض سعر",
      ],
    },
  },
];
