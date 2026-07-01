import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "sale" | "new" | "outline";
}

const variants = {
  default: "bg-[#1A1A2E]/80 text-white",
  sale: "bg-[#E94560] text-white",
  new: "bg-green-500 text-white",
  outline: "bg-transparent border border-[#E94560] text-[#E94560] dark:text-[#FF6B6B]",
};

export default function Badge({ children, variant = "default" }: BadgeProps) {
  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full backdrop-blur-sm ${variants[variant]}`}>
      {children}
    </span>
  );
}
