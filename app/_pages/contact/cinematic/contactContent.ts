import { contact, WHATSAPP_NUMBER } from "../../home/cinematic/content";

export const PHONE_DISPLAY = contact.phone;
export const PHONE_TEL = `+${WHATSAPP_NUMBER}`;
export const EMAIL = "onedirectionkwt@gmail.com";
const MAP_QUERY = "Shuwaikh Industrial Area 1, Kuwait";
export const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`;
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`;

export const ctCopy = {
  en: {
    kicker: "Contact",
    lines: ["Tell us what", "you have in mind."],
    body: "Send a photo, a size or just an idea. We'll design it, make it and install it — free delivery and installation included.",
    whatsapp: "Message on WhatsApp",
    call: "Call us",
    waText: "Hello Decolab, I'd like to ask about a custom order.",

    reachKicker: "Reach us directly",
    rows: {
      call: "Call",
      whatsapp: "WhatsApp",
      email: "Email",
      visit: "Visit the workshop",
    },
    hint: {
      call: "Speak to the team",
      whatsapp: "Fastest reply",
      email: "For quotes and files",
      visit: "Get directions",
    },
    address: "Shuwaikh Industrial Area 1 Plot: 1, Parcel: 79C, Street: 19",

    cardKicker: "Fastest reply",
    cardTitle: "Message us on WhatsApp",
    cardBody:
      "Send photos, sizes or an idea — we'll come back with a design and a price.",
    followKicker: "Follow our work",

    mapTitle: "Visit the workshop",
    mapMeta: "Get directions",
    mapLabel: "Map of the Decolab workshop in Shuwaikh Industrial Area",
  },
  ar: {
    kicker: "تواصل معنا",
    lines: ["أخبرنا بما", "تتخيله."],
    body: "أرسل صورة أو مقاساً أو مجرد فكرة. نصممه ونصنعه ونركّبه — مع توصيل وتركيب مجاني.",
    whatsapp: "راسلنا عبر واتساب",
    call: "اتصل بنا",
    waText: "مرحباً ديكولاب، أود الاستفسار عن طلب مخصص.",

    reachKicker: "تواصل معنا مباشرة",
    rows: {
      call: "اتصال",
      whatsapp: "واتساب",
      email: "البريد الإلكتروني",
      visit: "زر الورشة",
    },
    hint: {
      call: "تحدث مع الفريق",
      whatsapp: "أسرع رد",
      email: "لعروض الأسعار والملفات",
      visit: "احصل على الاتجاهات",
    },
    address: "شويخ الصناعية 1، قطعة 1، قسيمة 79C، شارع 19",

    cardKicker: "أسرع رد",
    cardTitle: "راسلنا عبر واتساب",
    cardBody: "أرسل صوراً أو مقاسات أو فكرة — ونعود إليك بتصميم وسعر.",
    followKicker: "تابع أعمالنا",

    mapTitle: "زر الورشة",
    mapMeta: "احصل على الاتجاهات",
    mapLabel: "خريطة ورشة ديكولاب في شويخ الصناعية",
  },
} as const;
