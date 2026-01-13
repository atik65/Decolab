"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useGetLocale } from "@/hooks/useGetLocale";
import { ShapeHero } from "@/components/shared/ShapeHero";

const About = () => {
  const locale = useGetLocale();

  const content = {
    en: {
      hero: {
        title: "About One Direction",
        subtitle: "Crafting Identity Through Excellence",
        description:
          "Your trusted partner for premium signage and custom design solutions",
      },
      story: {
        title: "Our Story",
        text1:
          "Founded with a vision to transform businesses through impactful visual communication, One Direction has become a leading name in the signage and custom design industry.",
        text2:
          "For over 15 years, we've been dedicated to creating stunning, high-quality products that help our clients stand out. From custom house numbers to illuminated business signage, every piece we create is a testament to our commitment to excellence.",
        text3:
          "Our journey began with a simple belief: that every business and home deserves signage that reflects its unique identity and values. Today, we continue to innovate and push boundaries in design, bringing your vision to life with precision and artistry.",
      },
      mission: {
        title: "Our Mission",
        text: "To deliver exceptional signage solutions that enhance brand visibility and create lasting impressions, while maintaining the highest standards of quality and customer service.",
      },
      vision: {
        title: "Our Vision",
        text: "To be the leading signage provider in the region, recognized for innovation, craftsmanship, and unwavering commitment to client satisfaction.",
      },
      values: {
        title: "Our Core Values",
        items: [
          {
            title: "Quality Excellence",
            description:
              "We never compromise on quality. Every product undergoes rigorous quality checks to ensure it meets our high standards.",
            icon: "⭐",
          },
          {
            title: "Innovation",
            description:
              "We stay ahead of industry trends, continuously exploring new materials, techniques, and designs.",
            icon: "💡",
          },
          {
            title: "Customer Focus",
            description:
              "Your satisfaction is our priority. We listen, understand, and deliver solutions that exceed expectations.",
            icon: "❤️",
          },
          {
            title: "Integrity",
            description:
              "We conduct business with honesty and transparency, building lasting relationships based on trust.",
            icon: "🤝",
          },
          {
            title: "Sustainability",
            description:
              "We're committed to eco-friendly practices, using sustainable materials whenever possible.",
            icon: "🌱",
          },
          {
            title: "Craftsmanship",
            description:
              "Each piece is created with meticulous attention to detail by our skilled artisans.",
            icon: "🎨",
          },
        ],
      },
      expertise: {
        title: "Our Expertise",
        items: [
          {
            title: "Custom House Numbers",
            description:
              "Elegant and durable house numbers that add personality to your home.",
          },
          {
            title: "Diwaniya Designs",
            description:
              "Traditional and modern designs that honor cultural heritage.",
          },
          {
            title: "Business Signage",
            description:
              "Eye-catching illuminated signs that boost your brand presence.",
          },
          {
            title: "Islamic Calligraphy",
            description:
              "Beautiful Arabic calligraphy pieces crafted with reverence.",
          },
          {
            title: "Custom Designs",
            description:
              "Bespoke solutions tailored to your unique requirements.",
          },
          {
            title: "Installation Services",
            description:
              "Professional installation ensuring perfect placement.",
          },
        ],
      },
      stats: [
        { number: "2500+", label: "Happy Clients" },
        { number: "5000+", label: "Projects Completed" },
        { number: "15+", label: "Years of Experience" },
        { number: "50+", label: "Product Categories" },
      ],
      cta: {
        title: "Ready to Create Something Amazing?",
        subtitle:
          "Let's bring your vision to life with our expert design and craftsmanship.",
        button: "Contact Us Today",
      },
    },
    ar: {
      hero: {
        title: "حول ون دايركشن",
        subtitle: "صياغة الهوية من خلال التميز",
        description: "شريكك الموثوق للافتات المتميزة وحلول التصميم المخصصة",
      },
      story: {
        title: "قصتنا",
        text1:
          "تأسست بتطلع لتحويل الأعمال التجارية من خلال التواصل البصري المؤثر، أصبحت ون دايركشن اسمًا رائدًا في صناعة اللافتات والتصميم المخصص.",
        text2:
          "لأكثر من 15 عامًا، كنا ملتزمين بإنشاء منتجات مذهلة عالية الجودة تساعد عملائنا على التميز. من أرقام المنازل المخصصة إلى لافتات الأعمال المضيئة، كل قطعة نصنعها هي شهادة على التزامنا بالتميز.",
        text3:
          "بدأت رحلتنا بإيمان بسيط: كل عمل ومنزل يستحق لافتات تعكس هويته وقيمه الفريدة. اليوم، نواصل الابتكار ودفع الحدود في التصميم، مما يحقق رؤيتك بدقة وفنية.",
      },
      mission: {
        title: "مهمتنا",
        text: "تقديم حلول لافتات استثنائية تعزز رؤية العلامة التجارية وتخلق انطباعات دائمة، مع الحفاظ على أعلى معايير الجودة وخدمة العملاء.",
      },
      vision: {
        title: "رؤيتنا",
        text: "أن نكون مزود اللافتات الرائد في المنطقة، معترف بنا للابتكار والحرفية والالتزام الثابت برضا العملاء.",
      },
      values: {
        title: "قيمنا الأساسية",
        items: [
          {
            title: "التميز في الجودة",
            description:
              "نحن لا نساوم أبدًا على الجودة. كل منتج يخضع لفحوصات جودة صارمة لضمان أنه يلبي معاييرنا العالية.",
            icon: "⭐",
          },
          {
            title: "الابتكار",
            description:
              "نحن نتقدم على اتجاهات الصناعة، ونستكشف باستمرار مواد وتقنيات وتصاميم جديدة.",
            icon: "💡",
          },
          {
            title: "التركيز على العميل",
            description:
              "رضاك هو أولويتنا. نحن نستمع ونفهم ونقدم حلولًا تتجاوز التوقعات.",
            icon: "❤️",
          },
          {
            title: "النزاهة",
            description:
              "نحن نمارس الأعمال بصدق وشفافية، وبناء علاقات دائمة على أساس الثقة.",
            icon: "🤝",
          },
          {
            title: "الاستدامة",
            description:
              "نحن ملتزمون بالممارسات الصديقة للبيئة، باستخدام مواد مستدامة كلما أمكن ذلك.",
            icon: "🌱",
          },
          {
            title: "الحرفية",
            description:
              "كل قطعة يتم إنشاؤها باهتمام دقيق بالتفاصيل من قبل حرفيينا المهرة.",
            icon: "🎨",
          },
        ],
      },
      expertise: {
        title: "خبرتنا",
        items: [
          {
            title: "أرقام المنازل المخصصة",
            description: "أرقام منازل أنيقة ومتينة تضيف شخصية لمنزلك.",
          },
          {
            title: "تصاميم الديوانية",
            description: "تصاميم تقليدية وحديثة تكرم التراث الثقافي.",
          },
          {
            title: "لافتات الأعمال",
            description: "لافتات مضيئة ملفتة للنظر تعزز حضور علامتك التجارية.",
          },
          {
            title: "الخط الإسلامي",
            description: "قطع خط عربي جميلة مصنوعة باحترام.",
          },
          {
            title: "التصاميم المخصصة",
            description: "حلول مخصصة مصممة لمتطلباتك الفريدة.",
          },
          {
            title: "خدمات التركيب",
            description: "تركيب احترافي يضمن وضعًا مثاليًا.",
          },
        ],
      },
      stats: [
        { number: "2500+", label: "عميل سعيد" },
        { number: "5000+", label: "مشروع مكتمل" },
        { number: "15+", label: "سنة من الخبرة" },
        { number: "50+", label: "فئة منتج" },
      ],
      cta: {
        title: "هل أنت مستعد لإنشاء شيء مذهل؟",
        subtitle: "دعنا نحقق رؤيتك بخبرتنا في التصميم والحرفية.",
        button: "اتصل بنا اليوم",
      },
    },
  };

  const currentContent = content[locale];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      {/* <section className="relative bg-gradient-to-br from-[#87A786] to-[#6d8a6c] text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              {currentContent.hero.title}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-4 text-white/90"
            >
              {currentContent.hero.subtitle}
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="w-20 h-1 bg-white/80 mx-auto mb-6"
            />
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-white/80"
            >
              {currentContent.hero.description}
            </motion.p>
          </motion.div>
        </div>
      </section> */}

      <ShapeHero
        badge="ONE DIRECTION"
        title1={currentContent.hero.title}
        // title2={locale === "en" ? "and Vision" : "ورؤيتنا"}
        description={currentContent.hero.description}
      />

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-900"
            >
              {currentContent.story.title}
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="w-16 h-1 bg-[#189CD9] mx-auto mb-12"
            />

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div variants={fadeInUp} className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {currentContent.story.text1}
                </p>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {currentContent.story.text2}
                </p>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {currentContent.story.text3}
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
              >
                <Image
                  src="/images/home/banner7.jpg"
                  alt="One Direction Story"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border-t-4 border-[#189CD9]"
            >
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                {currentContent.mission.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {currentContent.mission.text}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border-t-4 border-[#189CD9]"
            >
              <div className="text-4xl mb-4">🔭</div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                {currentContent.vision.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {currentContent.vision.text}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-[#87A786] to-[#6d8a6c] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {currentContent.stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-2">
                  {stat.number}
                </div>
                <div className="text-white/90 text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-900"
            >
              {currentContent.values.title}
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="w-16 h-1 bg-[#189CD9] mx-auto mb-12"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {currentContent.values.items.map((value, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gray-50 p-6 md:p-8 rounded-2xl border-2 border-gray-100 hover:border-[#189CD9] transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-900"
            >
              {currentContent.expertise.title}
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="w-16 h-1 bg-[#189CD9] mx-auto mb-12"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {currentContent.expertise.items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <h4 className="text-lg md:text-xl font-bold mb-2 text-gray-900">
                    {item.title}
                  </h4>
                  <p className="text-gray-600 text-sm md:text-base">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#87A786] to-[#6d8a6c] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            >
              {currentContent.cta.title}
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl mb-8 text-white/90"
            >
              {currentContent.cta.subtitle}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <motion.a
                href={`/${locale}/contact`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white text-[#189CD9] px-8 md:px-12 py-4 rounded-lg font-bold text-base md:text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                {currentContent.cta.button}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
