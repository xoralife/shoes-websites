"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandsStrip from "@/components/BrandsStrip";
import FeatureStrip from "@/components/FeatureStrip";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanner from "@/components/PromoBanner";
import BrandStory from "@/components/BrandStory";
import TrustBadges from "@/components/TrustBadges";
import BundleOffer from "@/components/BundleOffer";
import InstagramFeed from "@/components/InstagramFeed";
import RecentlyViewed from "@/components/RecentlyViewed";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import RewardPoints from "@/components/RewardPoints";
import GiftCard from "@/components/GiftCard";
import ReferralProgram from "@/components/ReferralProgram";
import ReturnPolicy from "@/components/ReturnPolicy";
import ShippingInfo from "@/components/ShippingInfo";
import OrderTracking from "@/components/OrderTracking";
import LiveChat from "@/components/LiveChat";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import Toast from "@/components/Toast";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import CookieConsent from "@/components/CookieConsent";
import NewsletterPopup from "@/components/NewsletterPopup";

export default function Home() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Header />
      <Hero />
      <BrandsStrip />
      <FeatureStrip />
      <Categories />
      <FeaturedProducts />
      <BrandStory />
      <BundleOffer />
      <TrustBadges />
      <PromoBanner />
      <Testimonials />
      <FAQ />
      <InstagramFeed />
      <RecentlyViewed />
      <RewardPoints />
      <GiftCard />
      <ReferralProgram />
      <ReturnPolicy />
      <ShippingInfo />
      <OrderTracking />
      <Newsletter />
      <LiveChat />
      <Footer />
      <CartSidebar />
      <Toast />
      <ScrollToTop />
      <CookieConsent />
      <NewsletterPopup />
    </main>
  );
}
