import { FinalProduct } from "@/types/product";

export const products: FinalProduct[] = [
  {
    id: 1,
    ar: {
      id: 1,
      title: "لوحة أرقام منزلية كلاسيكية",
      images: [
        "/images/home/banner9.jpg",
        "/images/home/banner8.jpg",
        "/images/home/banner9.jpg",
        "/images/home/banner8.jpg",
        "/images/home/banner9.jpg",
        "/images/home/banner8.jpg",
      ],
      mainImage: "/images/home/banner9.jpg",
      hoveredImage: "/images/home/banner8.jpg",
      category: "كلاسيكي",
      price: "299",
      description:
        "لوحة أرقام منزلية كلاسيكية أنيقة مع تفاصيل منحوتة يدويًا. مصنوعة من الأكريليك عالي الجودة المقاوم للعوامل الجوية.",
      sizes: [
        { id: 1, title: "صغير", value: "20x15 سم" },
        { id: 2, title: "متوسط", value: "25x20 سم" },
        { id: 3, title: "كبير", value: "30x25 سم" },
      ],
      digits: [
        { id: 1, title: 1, value: 1 },
        { id: 2, title: 2, value: 2 },
        { id: 3, title: 3, value: 3 },
      ],
      colors: [
        { id: 1, name: "أسود", colorCode: "#000000" },
        { id: 2, name: "ذهبي", colorCode: "#D4AF37" },
        { id: 3, name: "فضي", colorCode: "#C0C0C0" },
      ],
      lightColors: [
        { id: 1, name: "أبيض دافئ", colorCode: "#F5F5DC" },
        { id: 2, name: "أبيض بارد", colorCode: "#F0F8FF" },
        { id: 3, name: "أزرق", colorCode: "#0000FF" },
        { id: 4, name: "أحمر", colorCode: "#FF0000" },
      ],
      designs: [
        { id: 1, url: "/designs/classic/1.svg", designName: "كلاسيكي 1" },
        { id: 2, url: "/designs/classic/2.svg", designName: "كلاسيكي 2" },
      ],
      fonts: [
        { id: 1, name: "خط تقليدي", url: "/fonts/traditional.woff" },
        { id: 2, name: "خط عصري", url: "/fonts/modern.woff" },
      ],
    },
    en: {
      id: 1,
      title: "Classic House Number Plaque",
      images: [
        "/images/home/banner9.jpg",
        "/images/home/banner8.jpg",
        "/images/home/banner9.jpg",
        "/images/home/banner8.jpg",
        "/images/home/banner9.jpg",
        "/images/home/banner8.jpg",
      ],
      mainImage: "/images/home/banner9.jpg",
      hoveredImage: "/images/home/banner8.jpg",
      category: "Classic",
      price: "299",
      description:
        "Elegant classic house number plaque with hand-carved details. Made from high-quality, weather-resistant acrylic.",
      sizes: [
        { id: 1, title: "Small", value: "20x15cm" },
        { id: 2, title: "Medium", value: "25x20cm" },
        { id: 3, title: "Large", value: "30x25cm" },
      ],
      digits: [
        { id: 1, title: 1, value: 1 },
        { id: 2, title: 2, value: 2 },
        { id: 3, title: 3, value: 3 },
      ],
      colors: [
        { id: 1, name: "Black", colorCode: "#000000" },
        { id: 2, name: "Gold", colorCode: "#D4AF37" },
        { id: 3, name: "Silver", colorCode: "#C0C0C0" },
      ],
      lightColors: [
        { id: 1, name: "Warm White", colorCode: "#F5F5DC" },
        { id: 2, name: "Cool White", colorCode: "#F0F8FF" },
        { id: 3, name: "Blue", colorCode: "#0000FF" },
        { id: 4, name: "Red", colorCode: "#FF0000" },
      ],
      designs: [
        { id: 1, url: "/designs/classic/1.svg", designName: "Classic 1" },
        { id: 2, url: "/designs/classic/2.svg", designName: "Classic 2" },
      ],
      fonts: [
        { id: 1, name: "Traditional", url: "/fonts/traditional.woff" },
        { id: 2, name: "Modern", url: "/fonts/modern.woff" },
      ],
    },
  },
];
