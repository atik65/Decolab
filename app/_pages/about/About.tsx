"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useGetLocale } from "@/hooks/useGetLocale";
import { ShapeHero } from "@/components/shared/ShapeHero";
import {
  Target,
  Eye,
  Award,
  Lightbulb,
  Heart,
  Shield,
  Leaf,
  Palette,
  Home,
  Building2,
  Store,
  Type,
  Wrench,
  CheckCircle2,
  Users,
  Briefcase,
  TrendingUp,
  Package,
} from "lucide-react";

const About = () => {
  const locale = useGetLocale();

  const content = {
    en: {
      hero: {
        title: "About Decolab",
        subtitle: "Crafting Identity Through Excellence",
        description:
          "Your trusted partner for premium signage and custom design solutions",
      },
      story: {
        title: "Our Story",
        text1:
          "Founded with a vision to transform businesses through impactful visual communication, Decolab has become a leading name in the signage and custom design industry.",
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
            Icon: Award,
          },
          {
            title: "Innovation",
            description:
              "We stay ahead of industry trends, continuously exploring new materials, techniques, and designs.",
            Icon: Lightbulb,
          },
          {
            title: "Customer Focus",
            description:
              "Your satisfaction is our priority. We listen, understand, and deliver solutions that exceed expectations.",
            Icon: Heart,
          },
          {
            title: "Integrity",
            description:
              "We conduct business with honesty and transparency, building lasting relationships based on trust.",
            Icon: Shield,
          },
          {
            title: "Sustainability",
            description:
              "We're committed to eco-friendly practices, using sustainable materials whenever possible.",
            Icon: Leaf,
          },
          {
            title: "Craftsmanship",
            description:
              "Each piece is created with meticulous attention to detail by our skilled artisans.",
            Icon: Palette,
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
            Icon: Home,
          },
          {
            title: "Diwaniya Designs",
            description:
              "Traditional and modern designs that honor cultural heritage.",
            Icon: Building2,
          },
          {
            title: "Business Signage",
            description:
              "Eye-catching illuminated signs that boost your brand presence.",
            Icon: Store,
          },
          {
            title: "Islamic Calligraphy",
            description:
              "Beautiful Arabic calligraphy pieces crafted with reverence.",
            Icon: Type,
          },
          {
            title: "Custom Designs",
            description:
              "Bespoke solutions tailored to your unique requirements.",
            Icon: Palette,
          },
          {
            title: "Installation Services",
            description:
              "Professional installation ensuring perfect placement.",
            Icon: Wrench,
          },
        ],
      },
      stats: [
        { number: "2500+", label: "Happy Clients", Icon: Users },
        { number: "5000+", label: "Projects Completed", Icon: Briefcase },
        { number: "15+", label: "Years of Experience", Icon: TrendingUp },
        { number: "50+", label: "Product Categories", Icon: Package },
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
            Icon: Award,
          },
          {
            title: "الابتكار",
            description:
              "نحن نتقدم على اتجاهات الصناعة، ونستكشف باستمرار مواد وتقنيات وتصاميم جديدة.",
            Icon: Lightbulb,
          },
          {
            title: "التركيز على العميل",
            description:
              "رضاك هو أولويتنا. نحن نستمع ونفهم ونقدم حلولًا تتجاوز التوقعات.",
            Icon: Heart,
          },
          {
            title: "النزاهة",
            description:
              "نحن نمارس الأعمال بصدق وشفافية، وبناء علاقات دائمة على أساس الثقة.",
            Icon: Shield,
          },
          {
            title: "الاستدامة",
            description:
              "نحن ملتزمون بالممارسات الصديقة للبيئة، باستخدام مواد مستدامة كلما أمكن ذلك.",
            Icon: Leaf,
          },
          {
            title: "الحرفية",
            description:
              "كل قطعة يتم إنشاؤها باهتمام دقيق بالتفاصيل من قبل حرفيينا المهرة.",
            Icon: Palette,
          },
        ],
      },
      expertise: {
        title: "خبرتنا",
        items: [
          {
            title: "أرقام المنازل المخصصة",
            description: "أرقام منازل أنيقة ومتينة تضيف شخصية لمنزلك.",
            Icon: Home,
          },
          {
            title: "تصاميم الديوانية",
            description: "تصاميم تقليدية وحديثة تكرم التراث الثقافي.",
            Icon: Building2,
          },
          {
            title: "لافتات الأعمال",
            description: "لافتات مضيئة ملفتة للنظر تعزز حضور علامتك التجارية.",
            Icon: Store,
          },
          {
            title: "الخط الإسلامي",
            description: "قطع خط عربي جميلة مصنوعة باحترام.",
            Icon: Type,
          },
          {
            title: "التصاميم المخصصة",
            description: "حلول مخصصة مصممة لمتطلباتك الفريدة.",
            Icon: Palette,
          },
          {
            title: "خدمات التركيب",
            description: "تركيب احترافي يضمن وضعًا مثاليًا.",
            Icon: Wrench,
          },
        ],
      },
      stats: [
        { number: "2500+", label: "عميل سعيد", Icon: Users },
        { number: "5000+", label: "مشروع مكتمل", Icon: Briefcase },
        { number: "15+", label: "سنة من الخبرة", Icon: TrendingUp },
        { number: "50+", label: "فئة منتج", Icon: Package },
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
      {/* <section className="relative bg-gradient-to-br from-brand-secondary to-brand-secondary-hover text-white py-20 md:py-32 overflow-hidden">
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
        badge="DECOLAB"
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
              className="w-16 h-1 bg-brand-primary mx-auto mb-12"
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
                className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl group"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <Image
                  src="/images/home/banner7.jpg"
                  alt="Decolab Story"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
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
              className="bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
                <Target className="w-8 h-8 text-brand-primary" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                {currentContent.mission.title}
              </h3>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                {currentContent.mission.text}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-white p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary/20 transition-colors">
                <Eye className="w-8 h-8 text-brand-primary" />
              </div>
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
      <section className="py-16 md:py-20 bg-gradient-to-br from-brand-primary to-brand-primary-gradAlt text-white relative overflow-hidden">
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
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {currentContent.stats.map((stat, index) => {
              const IconComponent = stat.Icon;
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="text-center group"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl lg:text-6xl font-black mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/90 text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
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
              className="w-16 h-1 bg-brand-primary mx-auto mb-12"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {currentContent.values.items.map((value, index) => {
                const IconComponent = value.Icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -8 }}
                    className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 hover:border-brand-primary hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="w-14 h-14 bg-brand-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-primary transition-colors">
                      <IconComponent className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                      {value.description}
                    </p>
                  </motion.div>
                );
              })}
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
              className="w-16 h-1 bg-brand-primary mx-auto mb-12"
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {currentContent.expertise.items.map((item, index) => {
                const IconComponent = item.Icon;
                return (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-brand-primary group"
                  >
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-brand-primary transition-colors">
                      <IconComponent className="w-6 h-6 text-brand-primary group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="text-lg md:text-xl font-bold mb-2 text-gray-900">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 text-sm md:text-base">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-brand-primary to-brand-primary-gradAlt text-white relative overflow-hidden">
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
                className="inline-flex items-center gap-3 bg-white text-brand-primary px-8 md:px-12 py-4 rounded-lg font-bold text-base md:text-lg hover:bg-gray-100 transition-colors duration-300 shadow-xl"
              >
                {currentContent.cta.button}
                <CheckCircle2 className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
