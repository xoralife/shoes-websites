import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SOLEMATE - Premium Shoes Store",
  description: "Step Into The Future - Premium sneakers crafted for comfort & style",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
