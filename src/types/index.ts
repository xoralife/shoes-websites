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

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  initials: string;
  color: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  desc: string;
}
