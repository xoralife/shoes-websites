import type { Product } from "@/context/CartContext";

export const products: Product[] = [
  { id: 1, name: "Air Max Pro", category: "Running", price: 129.99, originalPrice: 159.99, rating: 4.5, image: "" },
  { id: 2, name: "Runner 3000", category: "Training", price: 109.99, originalPrice: 139.99, rating: 4.8, image: "" },
  { id: 3, name: "Classic Leather", category: "Lifestyle", price: 149.99, originalPrice: 189.99, rating: 4.3, image: "" },
  { id: 4, name: "Sport Flex", category: "Sports", price: 99.99, originalPrice: 129.99, rating: 4.6, image: "" },
  { id: 5, name: "Trail Blazer", category: "Hiking", price: 139.99, originalPrice: 169.99, rating: 4.7, image: "" },
  { id: 6, name: "Cloud Walker", category: "Casual", price: 89.99, originalPrice: 119.99, rating: 4.4, image: "" },
  { id: 7, name: "Speed Demon", category: "Running", price: 159.99, originalPrice: 199.99, rating: 4.9, image: "" },
  { id: 8, name: "Urban Street", category: "Lifestyle", price: 119.99, originalPrice: 149.99, rating: 4.2, image: "" },
];

export const getProductById = (id: number): Product | undefined =>
  products.find((p) => p.id === id);

export const getRelatedProducts = (product: Product, limit = 4): Product[] =>
  products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
