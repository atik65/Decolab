import FeaturedProducts from "../_pages/home/FeaturedProducts";
import HomeBanner from "../_pages/home/HomeBanner";
import HomeCategories from "../_pages/home/HomeCategories";
import StatsSection from "../_pages/home/StatsSection";
import WhyChooseUsSection from "../_pages/home/WhyChooseUsSection";
// import TestimonialsSection from "../_pages/home/TestimonialsSection";

export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeCategories />
      <FeaturedProducts />
      <StatsSection />
      <WhyChooseUsSection />
      {/* <TestimonialsSection /> */}
      {/* <ContactSection /> */}
    </>
  );
}
