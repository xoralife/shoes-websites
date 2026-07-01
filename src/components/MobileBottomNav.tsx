"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, Grid3X3, Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { openCart, cartCount, wishlist } = useCart();
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const cur = window.scrollY;
      setVisible(cur < lastScroll || cur < 50);
      setLastScroll(cur);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const items = [
    { icon: Home, label: "Home", href: "/", active: pathname === "/" },
    { icon: Grid3X3, label: "Shop", href: "/search", active: pathname === "/search" },
    { icon: Heart, label: "Wishlist", href: "/wishlist", badge: wishlist.length, active: pathname === "/wishlist" },
    { icon: ShoppingBag, label: "Cart", href: "#", badge: cartCount, active: false, action: openCart },
  ];

  return (
    <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-[#1A1A2E] border-t border-gray-100 dark:border-[#2D2D4A] safe-area-bottom transition-transform duration-300 ${visible ? "translate-y-0" : "translate-y-full"}`}>
      <div className="flex items-center justify-around py-2">
        {items.map(({ icon: Icon, label, href, badge, active, action }) => (
          <button
            key={label}
            onClick={() => { if (action) action(); else router.push(href); }}
            className="flex flex-col items-center gap-0.5 px-4 py-1 relative"
          >
            <Icon size={20} className={active ? "text-[#E94560] dark:text-[#FF6B6B]" : "text-[#6C757D] dark:text-gray-400 dark:text-gray-500"} />
            {!!badge && badge > 0 && (
              <span className="absolute -top-0.5 right-2 bg-[#E94560] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">{badge}</span>
            )}
            <span className={`text-[10px] font-medium ${active ? "text-[#E94560] dark:text-[#FF6B6B]" : "text-[#6C757D] dark:text-gray-400 dark:text-gray-500"}`}>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
