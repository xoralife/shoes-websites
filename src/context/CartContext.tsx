"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string;
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
  toggleWishlist: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  dismissToast: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 2500);
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

  const toggleWishlist = useCallback((id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const dismissToast = useCallback(() => setIsToastVisible(false), []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
        toggleWishlist,
        openCart,
        closeCart,
        dismissToast,
        cartCount,
        cartTotal,
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
