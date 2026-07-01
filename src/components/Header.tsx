"use client";

import { useState, useEffect, useRef } from "react";
import { Search, User, ShoppingBag, Menu, X, Heart, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Men", href: "/category/men" },
  { name: "Women", href: "/category/women" },
  { name: "Kids", href: "/category/kids" },
  { name: "Sports", href: "/category/sports" },
  { name: "Sale", href: "/#featured" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();
  const { openCart, cartCount, wishlist } = useCart();
  const { user, logout, isLoggedIn } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setShowUserMenu(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) router.push(`/?q=${encodeURIComponent(searchQuery.trim())}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

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
            {navLinks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="text-sm font-medium text-[#16213E] dark:text-[#F8F9FA] hover:text-[#E94560] transition-colors duration-200"
              >
                {name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-4">
            <ThemeToggle />

            <button
              className="p-2 text-[#16213E] dark:text-[#F8F9FA] hover:text-[#E94560] transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              onClick={() => router.push("/wishlist")}
              className="p-2 text-[#16213E] dark:text-[#F8F9FA] hover:text-[#E94560] transition-colors hidden sm:block relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#E94560] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <div className="relative hidden sm:block" ref={userMenuRef}>
              <button
                onClick={() => isLoggedIn ? setShowUserMenu(!showUserMenu) : router.push("/auth")}
                className="p-2 text-[#16213E] hover:text-[#E94560] transition-colors"
                aria-label="User"
              >
                <User size={20} />
              </button>
              {showUserMenu && isLoggedIn && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1A1A2E] rounded-2xl shadow-xl border border-gray-100 dark:border-[#2D2D4A] py-2 z-50 animate-scale-in">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-[#16213E]">{user?.name}</p>
                    <p className="text-xs text-[#6C757D]">{user?.email}</p>
                  </div>
                  <button onClick={() => { router.push("/wishlist"); setShowUserMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-[#16213E] hover:bg-gray-50 flex items-center gap-2">
                    <Heart size={14} /> Wishlist
                  </button>
                  <button onClick={() => { logout(); setShowUserMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-[#E94560] hover:bg-gray-50 flex items-center gap-2">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>

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
          <form onSubmit={handleSearch} className="pb-4 animate-fade-in-up">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6C757D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#E94560]/20 focus:border-[#E94560] text-sm"
                autoFocus
              />
            </div>
          </form>
        )}
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-[#2D2D4A] bg-white dark:bg-[#1A1A2E] animate-fade-in-up">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                className="block py-2 text-sm font-medium text-[#16213E] dark:text-[#F8F9FA] hover:text-[#E94560] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {name}
              </a>
            ))}
            <a
              href="/wishlist"
              className="block py-2 text-sm font-medium text-[#16213E] dark:text-[#F8F9FA] hover:text-[#E94560] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
            </a>
            <a
              href={isLoggedIn ? "#" : "/auth"}
              className="block py-2 text-sm font-medium text-[#16213E] dark:text-[#F8F9FA] hover:text-[#E94560] transition-colors"
              onClick={(e) => { setIsMenuOpen(false); if (isLoggedIn) { e.preventDefault(); logout(); } }}
            >
              {isLoggedIn ? "Logout" : "Sign In"}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
