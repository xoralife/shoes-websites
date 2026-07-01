"use client";

import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef, type ReactNode } from "react";

interface Coupon {
  code: string;
  type: "percent" | "flat";
  value: number;
  label: string;
}

const VALID_COUPONS: Coupon[] = [
  { code: "SOLE20", type: "percent", value: 20, label: "20% Off" },
  { code: "FREESHIP", type: "flat", value: 15, label: "Free Shipping" },
  { code: "SOLEMATE10", type: "percent", value: 10, label: "10% Off" },
];

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: number[];
  isCartOpen: boolean;
  isToastVisible: boolean;
  toastMessage: string;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  toggleWishlist: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  dismissToast: () => void;
  cartCount: number;
  cartTotal: number;
  discountedTotal: number;
  discount: number;
  discountLabel: string;
  appliedCoupon: string;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [discountLabel, setDiscountLabel] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("solemate-cart");
    const savedWishlist = localStorage.getItem("solemate-wishlist");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem("solemate-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("solemate-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setIsToastVisible(false), 2500);
  }, []);

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart!`);
  }, [showToast]);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const incrementQuantity = useCallback((id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decrementQuantity = useCallback((id: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity > 0)
    );
  }, []);

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const applyCoupon = useCallback((code: string): boolean => {
    const coupon = VALID_COUPONS.find((c) => c.code === code.toUpperCase());
    if (!coupon) return false;
    const rawTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const disc = coupon.type === "percent" ? rawTotal * (coupon.value / 100) : coupon.value;
    setDiscount(disc);
    setDiscountLabel(coupon.label);
    setAppliedCoupon(coupon.code);
    return true;
  }, [cart]);

  const removeCoupon = useCallback(() => {
    setDiscount(0);
    setDiscountLabel("");
    setAppliedCoupon("");
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  const dismissToast = useCallback(() => setIsToastVisible(false), []);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const discountedTotal = useMemo(() => Math.max(0, cartTotal - discount), [cartTotal, discount]);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        isToastVisible,
        toastMessage,
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        toggleWishlist,
        openCart,
        closeCart,
        dismissToast,
        cartCount,
        cartTotal,
        discountedTotal,
        discount,
        discountLabel,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
