import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import SkipToContent from "@/components/SkipToContent";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SOLEMATE - Premium Shoes Store",
  description: "Step Into The Future - Premium sneakers crafted for comfort & style. Shop the latest collection of sneakers for men, women, and kids.",
  keywords: ["sneakers", "shoes", "footwear", "fashion", "SOLEMATE", "premium shoes"],
  manifest: "/manifest.json",
  openGraph: {
    title: "SOLEMATE - Premium Shoes Store",
    description: "Step Into The Future - Premium sneakers crafted for comfort & style",
    type: "website",
    siteName: "SOLEMATE",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOLEMATE - Premium Shoes Store",
    description: "Step Into The Future - Premium sneakers crafted for comfort & style",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <AuthProvider>
          <CartProvider>
            <SkipToContent />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
