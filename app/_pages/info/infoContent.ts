import { contact } from "../home/cinematic/content";
import { EMAIL } from "../contact/cinematic/contactContent";
import { wpCopy } from "../warranty/cinematic/warrantyContent";
import type { InfoCopy } from "./InfoPage";

const asInfo = (w: (typeof wpCopy)["en"] | (typeof wpCopy)["ar"]): InfoCopy => ({
  kicker: w.kicker,
  lines: w.lines,
  body: w.body,
  items: w.terms,
  note: { label: w.noteKicker, t: w.noteTitle, b: w.noteBody },
});

export const warrantyPage = { en: asInfo(wpCopy.en), ar: asInfo(wpCopy.ar) };

export const supportPage: { en: InfoCopy; ar: InfoCopy } = {
  en: {
    kicker: "Support",
    lines: ["We're here", "when you need us."],
    body: "Questions about an order, a design or an installation? This is how to reach the team and what to expect.",
    items: [
      {
        t: "Message us on WhatsApp",
        b: `The fastest way to reach us. Send photos, sizes or an idea on ${contact.phone} and the team will reply with a design and a price.`,
      },
      {
        t: "Call or email",
        b: `Call ${contact.phone} to speak to the team, or write to ${EMAIL} for quotes and files.`,
      },
      {
        t: "Visit the workshop",
        b: `${contact.address.en}, Kuwait.`,
      },
      {
        t: "After you order",
        b: "Our design department contacts you within 10 minutes or less to confirm your design before manufacturing starts. Your order is then delivered and installed within a week or less, free of charge.",
      },
      {
        t: "Warranty claims",
        b: "Your light is covered for 1 year and the paint for 5 years. If something isn't right, message us on WhatsApp with a photo and the details of your order.",
      },
    ],
  },
  ar: {
    kicker: "الدعم",
    lines: ["نحن هنا", "وقتما تحتاجنا."],
    body: "لديك سؤال عن طلب أو تصميم أو تركيب؟ هكذا تصل إلى الفريق وما الذي تتوقعه.",
    items: [
      {
        t: "راسلنا عبر واتساب",
        b: `أسرع طريقة للتواصل. أرسل صوراً أو مقاسات أو فكرة على الرقم ${contact.phone} وسيرد عليك الفريق بتصميم وسعر.`,
      },
      {
        t: "اتصل أو راسلنا بالبريد",
        b: `اتصل على ${contact.phone} للتحدث مع الفريق، أو راسلنا على ${EMAIL} لطلبات الأسعار والملفات.`,
      },
      {
        t: "زر الورشة",
        b: `${contact.address.ar}، الكويت.`,
      },
      {
        t: "بعد إتمام طلبك",
        b: "يتواصل معك قسم التصميم خلال 10 دقائق أو أقل لتأكيد التصميم قبل بدء التصنيع. ثم يُوصَّل طلبك ويُركَّب خلال أسبوع أو أقل مجاناً.",
      },
      {
        t: "مطالبات الضمان",
        b: "الإضاءة مضمونة لمدة سنة والطلاء لمدة 5 سنوات. إذا واجهتك أي مشكلة، راسلنا عبر واتساب مع صورة وتفاصيل طلبك.",
      },
    ],
  },
};

export const careGuidePage: { en: InfoCopy; ar: InfoCopy } = {
  en: {
    kicker: "Care Guide",
    lines: ["Keep it", "shining."],
    body: "Simple habits that keep your signs and house numbers looking new for years.",
    items: [
      {
        t: "Switch off before cleaning",
        b: "Always turn the power off before you clean any illuminated piece.",
      },
      {
        t: "Wipe gently",
        b: "Use a soft, slightly damp cloth on the aluminum and the acrylic. Dry with a clean soft cloth to avoid water marks.",
      },
      {
        t: "Avoid harsh products",
        b: "Don't use abrasive pads, solvents or strong chemicals. They can scratch the acrylic and damage the paint.",
      },
      {
        t: "Keep water off the electrics",
        b: "Don't spray water directly at the light or the connection point. Clean around them with a damp cloth.",
      },
      {
        t: "Don't modify the wiring",
        b: "If a light flickers or stops working, don't open or rewire it. Contact us and our team will take care of it.",
      },
      {
        t: "Covered by our warranty",
        b: "The light has a 1-year warranty and the paint a 5-year warranty. Following these steps helps keep it that way.",
      },
    ],
  },
  ar: {
    kicker: "دليل العناية",
    lines: ["حافظ على", "بريقها."],
    body: "عادات بسيطة تُبقي لافتاتك وأرقام منزلك كالجديدة لسنوات.",
    items: [
      {
        t: "افصل الكهرباء قبل التنظيف",
        b: "أطفئ التيار دائماً قبل تنظيف أي قطعة مضيئة.",
      },
      {
        t: "امسح برفق",
        b: "استخدم قطعة قماش ناعمة ورطبة قليلاً على الألمنيوم والأكريليك، ثم جففها بقطعة نظيفة ناعمة لتجنب بقع الماء.",
      },
      {
        t: "تجنب المنتجات القاسية",
        b: "لا تستخدم إسفنجاً خشناً أو مذيبات أو مواد كيميائية قوية، فقد تخدش الأكريليك وتتلف الطلاء.",
      },
      {
        t: "أبعد الماء عن الكهرباء",
        b: "لا ترشّ الماء مباشرة على الإضاءة أو نقطة التوصيل. نظّف حولها بقطعة قماش رطبة.",
      },
      {
        t: "لا تعدّل التمديدات",
        b: "إذا اهتزت الإضاءة أو توقفت عن العمل فلا تفتحها ولا تعيد توصيلها. تواصل معنا وسيتولى فريقنا الأمر.",
      },
      {
        t: "مشمولة بضماننا",
        b: "الإضاءة بضمان سنة والطلاء بضمان 5 سنوات. اتباع هذه الخطوات يساعد على الحفاظ على ذلك.",
      },
    ],
  },
};

export const faqPage: { en: InfoCopy; ar: InfoCopy } = {
  en: {
    kicker: "F.A.Q.",
    lines: ["Quick answers", "to common questions."],
    body: "Everything people ask us most about ordering, delivery, installation and warranty.",
    items: [
      {
        t: "What does Decolab make?",
        b: "Illuminated signage, LED house numbers, acrylic 3D letters, Islamic calligraphy, diwaniya and farm signs, and banner and flash printing — all made and installed in Kuwait.",
      },
      {
        t: "I don't have a design. Can you make one?",
        b: "Yes. If you don't have a design, we will make it for you. Send us a photo, a size or just an idea.",
      },
      {
        t: "How does payment work?",
        b: "A 50% advance payment is required before installation commences. The remaining 50% is payable immediately after successful completion of the installation.",
      },
      {
        t: "How soon will you contact me after I order?",
        b: "Our design department contacts you within 10 minutes or less to confirm your design before we start manufacturing.",
      },
      {
        t: "How long do delivery and installation take?",
        b: "Your order is delivered and installed within a week or less.",
      },
      {
        t: "Do delivery and installation cost extra?",
        b: "No. Delivery and installation by our team of experts are free.",
      },
      {
        t: "What are the house numbers made of?",
        b: "High-quality aluminum with a layer of acrylic behind the aluminum. Our double-sided house numbers can also be installed on car parking umbrellas.",
      },
      {
        t: "What warranty do I get?",
        b: "A 1-year warranty on the light and a 5-year warranty on the paint.",
      },
      {
        t: "Do you provide the electrical point?",
        b: "No. The customer is responsible for providing a properly placed electrical connection. We are not responsible for installing or supplying the electrical point needed for the product.",
      },
      {
        t: "Where are you located?",
        b: `${contact.address.en}, Kuwait.`,
      },
    ],
  },
  ar: {
    kicker: "الأسئلة الشائعة",
    lines: ["إجابات سريعة", "عن الأسئلة المتكررة."],
    body: "كل ما يسألنا عنه الناس أكثر بخصوص الطلب والتوصيل والتركيب والضمان.",
    items: [
      {
        t: "ماذا تصنع ديكولاب؟",
        b: "لافتات مضيئة، أرقام منازل LED، حروف أكريليك ثلاثية الأبعاد، خط إسلامي، لوحات ديوانيات ومزارع، وطباعة البانر والفلاش — كلها تُصنع وتُركَّب في الكويت.",
      },
      {
        t: "ليس لدي تصميم، هل يمكنكم تصميمه؟",
        b: "نعم. إذا لم يكن لديك تصميم فسنصممه لك. أرسل لنا صورة أو مقاساً أو مجرد فكرة.",
      },
      {
        t: "كيف يتم الدفع؟",
        b: "يُشترط دفع 50% مقدماً قبل البدء بالتركيب، ويُدفع الـ 50% المتبقية فور اكتمال التركيب بنجاح.",
      },
      {
        t: "متى ستتواصلون معي بعد الطلب؟",
        b: "يتواصل معك قسم التصميم خلال 10 دقائق أو أقل لتأكيد التصميم قبل بدء التصنيع.",
      },
      {
        t: "كم يستغرق التوصيل والتركيب؟",
        b: "يتم توصيل طلبك وتركيبه خلال أسبوع أو أقل.",
      },
      {
        t: "هل التوصيل والتركيب بتكلفة إضافية؟",
        b: "لا. التوصيل والتركيب بواسطة فريقنا من الخبراء مجاني.",
      },
      {
        t: "مم تُصنع أرقام المنازل؟",
        b: "من الألمنيوم عالي الجودة مع طبقة أكريليك خلف الألمنيوم. ويمكن أيضاً تركيب أرقامنا ذات الوجهين على مظلات مواقف السيارات.",
      },
      {
        t: "ما الضمان الذي أحصل عليه؟",
        b: "ضمان سنة على الإضاءة و5 سنوات على الطلاء.",
      },
      {
        t: "هل توفرون نقطة الكهرباء؟",
        b: "لا. العميل مسؤول عن توفير نقطة كهرباء مجهّزة في المكان المناسب، ونحن غير مسؤولين عن تركيبها أو توفيرها.",
      },
      {
        t: "أين موقعكم؟",
        b: `${contact.address.ar}، الكويت.`,
      },
    ],
  },
};
