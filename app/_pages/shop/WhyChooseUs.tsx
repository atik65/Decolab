"use client";

import { useGetLocale } from "@/hooks/useGetLocale";

interface Feature {
  icon: React.ReactElement;
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
}

const features: Feature[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    title: {
      en: "Premium Materials",
      ar: "مواد ممتازة",
    },
    description: {
      en: "High-quality materials ensuring durability and lasting beauty",
      ar: "مواد عالية الجودة تضمن المتانة والجمال الدائم",
    },
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: {
      en: "Expert Craftsmanship",
      ar: "حرفية خبيرة",
    },
    description: {
      en: "Skilled artisans dedicated to perfecting every detail",
      ar: "حرفيون ماهرون مكرسون لإتقان كل التفاصيل",
    },
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: {
      en: "Quick Turnaround",
      ar: "تسليم سريع",
    },
    description: {
      en: "Fast production and delivery without compromising quality",
      ar: "إنتاج وتسليم سريع دون المساس بالجودة",
    },
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: {
      en: "Competitive Pricing",
      ar: "أسعار تنافسية",
    },
    description: {
      en: "Fair prices with excellent value for your investment",
      ar: "أسعار عادلة مع قيمة ممتازة لاستثمارك",
    },
  },
];

const WhyChooseUs = () => {
  const locale = useGetLocale();

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {locale === "en" ? "Why Choose Us" : "لماذا تختارنا"}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {locale === "en"
              ? "We're committed to delivering excellence in every project"
              : "نحن ملتزمون بتقديم التميز في كل مشروع"}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-brand-secondary/50 hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-brand-secondary/20 to-brand-secondary/10 rounded-lg md:rounded-xl text-brand-secondary mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                {feature.title[locale]}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                {feature.description[locale]}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="relative inline-block">
            {/* Decorative glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary/20 via-brand-secondary/30 to-brand-secondary/20 blur-xl rounded-full"></div>

            {/* Main badge */}
            <div className="relative bg-gradient-to-r from-white via-gray-50 to-white px-8 md:px-10 py-4 md:py-5 rounded-2xl border-2 border-brand-secondary/20 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3 md:gap-4">
                {/* Premium icon with animation */}
                <div className="relative">
                  <div className="absolute inset-0 bg-brand-secondary/20 rounded-full animate-ping"></div>
                  <div className="relative bg-gradient-to-br from-brand-secondary to-brand-secondary-hover p-2 rounded-full shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 md:h-6 md:w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Text content */}
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-sm md:text-base font-bold bg-gradient-to-r from-brand-secondary to-brand-secondary-hover bg-clip-text text-transparent">
                    {locale === "en"
                      ? "Trusted by 1000+ customers"
                      : "موثوق به من قبل أكثر من 1000 عميل"}
                  </span>
                  <span className="text-xs md:text-sm text-gray-600 font-medium">
                    {locale === "en"
                      ? "in Kuwait & GCC Region"
                      : "في الكويت ودول مجلس التعاون الخليجي"}
                  </span>
                </div>

                {/* Star ratings */}
                <div className="hidden md:flex items-center gap-1 ml-2 pl-4 border-l-2 border-brand-secondary/20">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 text-brand-secondary fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                  <span className="text-xs font-semibold text-gray-700 ml-1">
                    5.0
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
