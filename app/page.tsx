import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import TickerSection from "@/components/sections/ticker-section";
import ProductSection from "@/components/sections/product-section";
import StorySection from "@/components/sections/story-section";
import ValuesSection from "@/components/sections/values-section";
import OrderSection from "@/components/sections/order-section";
import FaqSection from "@/components/sections/faq-section";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TickerSection />
        <ProductSection />
        <StorySection />
        <ValuesSection />
        <OrderSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
