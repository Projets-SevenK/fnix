import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero-section";
import TickerSection from "@/components/sections/ticker-section";
import ProductSection from "@/components/sections/product-section";
import StorySection from "@/components/sections/story-section";
import ValuesSection from "@/components/sections/values-section";
import OrderSection from "@/components/sections/order-section";
import FaqSection from "@/components/sections/faq-section";
import { getSettings } from "@/lib/settings";

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <>
      <Header />
      <main>
        <HeroSection heroImageUrl={settings?.hero_image_url ?? null} />
        <TickerSection />
        <ProductSection
          mainImageUrl={settings?.product_image_main_url ?? null}
          secondary1Url={settings?.product_image_secondary_1_url ?? null}
          secondary2Url={settings?.product_image_secondary_2_url ?? null}
          description={settings?.product_description ?? null}
        />
        <StorySection />
        <ValuesSection />
        <OrderSection />
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
