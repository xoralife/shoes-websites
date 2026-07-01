import type { ReactNode } from "react";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ subtitle, title, description, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : ""}`}>
      {subtitle && (
        <span className="text-[#E94560] dark:text-[#FF6B6B] font-semibold text-sm tracking-wider uppercase">{subtitle}</span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-[#16213E] dark:text-[#F8F9FA] mt-2">{title}</h2>
      {description && (
        <p className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 mt-3 max-w-md mx-auto">{description}</p>
      )}
    </div>
  );
}
