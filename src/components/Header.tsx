"use client";

import { useState, useEffect } from "react";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = ["Home", "New Arrivals", "Men", "Women", "Kids", "Sale"];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { openCart, cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 glass transition-shadow duration-300 ${isScrolled ? "shadow-lg" : "shadow-none"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          <button
            className="md:hidden p-2 text-[#1A1A2E]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#1A1A2E] to-[#0F3460] bg-clip-text text-transparent">
              SOLEMATE
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={link === "Home" ? "#" : `#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm font-medium text-[#16213E] hover:text-[#E94560] transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
            <button
              className="p-2 text-[#16213E] hover:text-[#E94560] transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              className="p-2 text-[#16213E] hover:text-[#E94560] transition-colors hidden sm:block"
              aria-label="User"
            >
              <User size={20} />
            </button>

            <button
              className="p-2 text-[#16213E] hover:text-[#E94560] transition-colors relative"
              onClick={openCart}
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E94560] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="pb-4 animate-fade-in-up">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6C757D]" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#E94560]/20 focus:border-[#E94560] text-sm"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white animate-fade-in-up">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="block py-2 text-sm font-medium text-[#16213E] hover:text-[#E94560] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <a
              href="#"
              className="block py-2 text-sm font-medium text-[#16213E] hover:text-[#E94560] transition-colors sm:hidden"
              onClick={() => setIsMenuOpen(false)}
            >
              Account
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
