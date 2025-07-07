import { FinalProduct } from "@/types/product";

export const products: FinalProduct[] = [
  {
    id: 1,
    ar: {
      // id: 1,
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
        { id: 1, name: "وردي فاتح", colorCode: "#FFB6C1" },
        { id: 2, name: "أحمر", colorCode: "#FF0000" },
        { id: 3, name: "أصفر", colorCode: "#FFA500" },
        { id: 4, name: "أزرق", colorCode: "#C19AED" },
        { id: 5, name: "بني", colorCode: "#A52A2A" },
      ],
      designs: [
        {
          id: 1,
          url: "/images/products/design/design1.avif",
          name: "تصميم 1",
        },
        {
          id: 2,
          url: "/images/products/design/design2.avif",
          name: "تصميم 2",
        },
        {
          id: 3,
          url: "/images/products/design/design3.avif",
          name: "تصميم 1",
        },
        {
          id: 4,
          url: "/images/products/design/design4.avif",
          name: "تصميم 2",
        },
        {
          id: 5,
          url: "/images/products/design/design5.webp",
          name: "تصميم 2",
        },
      ],
      fonts: [
        {
          id: 1,
          url: "/images/products/fonts/f1.avif",
          name: "خط تقليدي",
        },
        {
          id: 2,
          url: "/images/products/fonts/f2.avif",
          name: "خط عصري",
        },
        {
          id: 3,
          url: "/images/products/fonts/f3.avif",
          name: "خط 3 عصري",
        },
        {
          id: 4,
          url: "/images/products/fonts/f4.avif",
          name: "خط 4 عصري",
        },
        {
          id: 5,
          url: "/images/products/fonts/f5.avif",
          name: "خط 5 عصري",
        },
        {
          id: 6,
          url: "/images/products/fonts/f6.avif",
          name: "خط 6 عصري",
        },
        {
          id: 7,
          url: "/images/products/fonts/f7.avif",
          name: "خط 7 عصري",
        },
        {
          id: 8,
          url: "/images/products/fonts/f8.avif",
          name: "خط 8 عصري",
        },
        {
          id: 9,
          url: "/images/products/fonts/f9.avif",
          name: "خط 9 عصري",
        },
      ],
    },
    en: {
      // id: 1,
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
        { id: 1, name: "light pink", colorCode: "#FFB6C1" },
        { id: 2, name: "light red", colorCode: "#FF0000" },
        { id: 3, name: "light orange", colorCode: "#FFA500" },
        { id: 4, name: "light purple", colorCode: "#C19AED" },
        { id: 5, name: "light brown", colorCode: "#A52A2A" },
      ],
      designs: [
        {
          id: 1,
          url: "/images/products/design/design1.avif",
          name: "Design 1",
        },
        {
          id: 2,
          url: "/images/products/design/design2.avif",
          name: "Design 2",
        },
        {
          id: 3,
          url: "/images/products/design/design3.avif",
          name: "Design 1",
        },
        {
          id: 4,
          url: "/images/products/design/design4.avif",
          name: "Design 2",
        },
        {
          id: 5,
          url: "/images/products/design/design5.webp",
          name: "Design 2",
        },
      ],
      fonts: [
        {
          id: 1,
          url: "/images/products/fonts/f1.avif",
          name: "Font 1",
        },
        {
          id: 2,
          url: "/images/products/fonts/f2.avif",
          name: "Font 2",
        },
        {
          id: 3,
          url: "/images/products/fonts/f3.avif",
          name: "Font 3",
        },
        {
          id: 4,
          url: "/images/products/fonts/f4.avif",
          name: "Font 4",
        },
        {
          id: 5,
          url: "/images/products/fonts/f5.avif",
          name: "Font 5",
        },
        {
          id: 6,
          url: "/images/products/fonts/f6.avif",
          name: "Font 6",
        },
        {
          id: 7,
          url: "/images/products/fonts/f7.avif",
          name: "Font 7",
        },
        {
          id: 8,
          url: "/images/products/fonts/f8.avif",
          name: "Font 8",
        },
        {
          id: 9,
          url: "/images/products/fonts/f9.avif",
          name: "Font 9",
        },
      ],
    },
  },
];

export const findProductById = (id: number): FinalProduct | undefined => {
  return products.find((product) => product.id == id);
};
