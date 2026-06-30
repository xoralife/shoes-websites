"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandsStrip from "@/components/BrandsStrip";
import FeatureStrip from "@/components/FeatureStrip";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanner from "@/components/PromoBanner";
import RecentlyViewed from "@/components/RecentlyViewed";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import Toast from "@/components/Toast";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";
import NewsletterPopup from "@/components/NewsletterPopup";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BrandsStrip />
      <FeatureStrip />
      <Categories />
      <FeaturedProducts />
      <PromoBanner />
      <Testimonials />
      <FAQ />
      <RecentlyViewed />
      <Newsletter />
      <Footer />
      <CartSidebar />
      <Toast />
      <ScrollToTop />
      <CookieConsent />
      <NewsletterPopup />
    </main>
  );
}
