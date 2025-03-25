import ContactSection from "./_pages/home/ContactsSection";
import FeaturedProducts from "./_pages/home/FeaturedProducts";
import HomeBanner from "./_pages/home/HomeBanner";
import HomeCategories from "./_pages/home/HomeCategories";

export default function Home() {
  return (
    <>
      <HomeBanner />
      <HomeCategories />
      <FeaturedProducts />
      <ContactSection />
    </>
  );
}
