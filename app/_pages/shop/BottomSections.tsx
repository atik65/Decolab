"use client";

import { useState } from "react";
import { useGetLocale } from "@/hooks/useGetLocale";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

// Testimonials Component
export const TestimonialsSection = () => {
  const locale = useGetLocale();

  const testimonials = [
    {
      name: { en: "Ahmed Al-Mutairi", ar: "أحمد المطيري" },
      role: { en: "Business Owner", ar: "صاحب عمل" },
      image:
        "https://ui-avatars.com/api/?name=Ahmed+Al-Mutairi&background=87A786&color=fff",
      rating: 5,
      text: {
        en: "Excellent quality and fast delivery. The house numbers look amazing on my villa!",
        ar: "جودة ممتازة وتسليم سريع. أرقام المنزل تبدو رائعة على فيلتي!",
      },
    },
    {
      name: { en: "Sarah Abdullah", ar: "سارة عبدالله" },
      role: { en: "Interior Designer", ar: "مصممة داخلية" },
      image:
        "https://ui-avatars.com/api/?name=Sarah+Abdullah&background=87A786&color=fff",
      rating: 5,
      text: {
        en: "Professional service and beautiful custom signage. Highly recommend!",
        ar: "خدمة احترافية ولافتات مخصصة جميلة. أنصح بشدة!",
      },
    },
    {
      name: { en: "Mohammed Fahad", ar: "محمد فهد" },
      role: { en: "Homeowner", ar: "مالك منزل" },
      image:
        "https://ui-avatars.com/api/?name=Mohammed+Fahad&background=87A786&color=fff",
      rating: 5,
      text: {
        en: "Great attention to detail. The stickers are perfect for my business!",
        ar: "اهتمام كبير بالتفاصيل. الملصقات مثالية لعملي!",
      },
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {locale === "en" ? "What Our Customers Say" : "ماذا يقول عملاؤنا"}
          </h2>
          <p className="text-gray-600">
            {locale === "en"
              ? "Real feedback from our valued customers"
              : "ردود فعل حقيقية من عملائنا الكرام"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 italic">
                &quot;{testimonial.text[locale]}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name[locale]}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name[locale]}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.role[locale]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// How It Works Component
export const HowItWorksSection = () => {
  const locale = useGetLocale();

  const steps = [
    {
      number: "01",
      title: { en: "Choose Your Product", ar: "اختر منتجك" },
      description: {
        en: "Browse our collection and select the perfect design for your needs",
        ar: "تصفح مجموعتنا واختر التصميم المثالي لاحتياجاتك",
      },
      icon: "🛍️",
    },
    {
      number: "02",
      title: { en: "Customize Details", ar: "تخصيص التفاصيل" },
      description: {
        en: "Add your text, choose colors, and customize every detail",
        ar: "أضف نصك واختر الألوان وخصص كل التفاصيل",
      },
      icon: "🎨",
    },
    {
      number: "03",
      title: { en: "Place Your Order", ar: "قدم طلبك" },
      description: {
        en: "Complete your order with secure checkout and delivery details",
        ar: "أكمل طلبك بدفع آمن وتفاصيل التسليم",
      },
      icon: "✅",
    },
    {
      number: "04",
      title: { en: "Receive & Install", ar: "استلم وثبت" },
      description: {
        en: "Get your custom product delivered and enjoy the perfect finish",
        ar: "احصل على منتجك المخصص وتمتع باللمسة المثالية",
      },
      icon: "📦",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-brand-secondary/5 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {locale === "en" ? "How It Works" : "كيف يعمل"}
          </h2>
          <p className="text-gray-600">
            {locale === "en"
              ? "Simple steps to get your custom products"
              : "خطوات بسيطة للحصول على منتجاتك المخصصة"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-brand-secondary to-brand-secondary/30 z-0" />
              )}

              <div className="relative z-10 text-center">
                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-brand-secondary to-brand-secondary-hover rounded-full text-white font-bold text-2xl mb-4 shadow-lg">
                  <span className="text-4xl">{step.icon}</span>
                </div>

                {/* Step Number */}
                <div className="text-brand-secondary font-bold text-sm mb-2">
                  {step.number}
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  {step.title[locale]}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm">
                  {step.description[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// FAQ Component
export const FAQSection = () => {
  const locale = useGetLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: {
        en: "How long does delivery take?",
        ar: "كم من الوقت يستغرق التسليم؟",
      },
      answer: {
        en: "Standard delivery within Kuwait takes 3-5 business days. Express delivery is available for urgent orders.",
        ar: "يستغرق التسليم القياسي داخل الكويت 3-5 أيام عمل. يتوفر التسليم السريع للطلبات العاجلة.",
      },
    },
    {
      question: {
        en: "Can I customize the design?",
        ar: "هل يمكنني تخصيص التصميم؟",
      },
      answer: {
        en: "Yes! All our products are fully customizable. You can choose colors, text, fonts, and designs to match your preferences.",
        ar: "نعم! جميع منتجاتنا قابلة للتخصيص بالكامل. يمكنك اختيار الألوان والنص والخطوط والتصاميم لتناسب تفضيلاتك.",
      },
    },
    {
      question: {
        en: "What materials do you use?",
        ar: "ما هي المواد التي تستخدمونها؟",
      },
      answer: {
        en: "We use premium quality materials including acrylic, metal, vinyl, and weather-resistant materials suitable for indoor and outdoor use.",
        ar: "نستخدم مواد عالية الجودة بما في ذلك الأكريليك والمعدن والفينيل ومواد مقاومة للطقس مناسبة للاستخدام الداخلي والخارجي.",
      },
    },
    {
      question: {
        en: "Do you offer bulk discounts?",
        ar: "هل تقدمون خصومات للطلبات الكبيرة؟",
      },
      answer: {
        en: "Yes, we offer competitive pricing for bulk orders. Contact us for a custom quote based on your requirements.",
        ar: "نعم، نقدم أسعارًا تنافسية للطلبات الكبيرة. اتصل بنا للحصول على عرض أسعار مخصص بناءً على متطلباتك.",
      },
    },
    {
      question: {
        en: "How do I install the products?",
        ar: "كيف أقوم بتركيب المنتجات؟",
      },
      answer: {
        en: "Most products come with easy installation instructions and mounting hardware. Professional installation services are also available upon request.",
        ar: "تأتي معظم المنتجات مع تعليمات تركيب سهلة ومعدات التثبيت. خدمات التركيب الاحترافية متاحة أيضًا عند الطلب.",
      },
    },
  ];

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {locale === "en"
                ? "Frequently Asked Questions"
                : "الأسئلة الشائعة"}
            </h2>
            <p className="text-gray-600">
              {locale === "en"
                ? "Find answers to common questions about our products and services"
                : "ابحث عن إجابات للأسئلة الشائعة حول منتجاتنا وخدماتنا"}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden hover:border-brand-secondary/50 transition-colors"
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question[locale]}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-secondary transition-transform flex-shrink-0 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openIndex === index && (
                  <div className="px-5 pb-5 pt-2 bg-gray-50">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer[locale]}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          {/* <div className="mt-12 text-center bg-gradient-to-r from-brand-secondary/10 to-transparent p-6 rounded-xl border border-brand-secondary/20">
            <p className="text-gray-700 mb-4">
              {locale === "en"
                ? "Still have questions? We're here to help!"
                : "لا تزال لديك أسئلة؟ نحن هنا للمساعدة!"}
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-secondary hover:bg-brand-secondary-hover text-white font-semibold rounded-lg transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {locale === "en" ? "Contact Us" : "اتصل بنا"}
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};
