import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-[#6C757D] py-4">
      <a href="/" className="hover:text-[#E94560] transition-colors">
        <Home size={14} />
      </a>
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1">
          <ChevronRight size={12} />
          {i === items.length - 1 ? (
            <span className="text-[#16213E] font-medium">{item.label}</span>
          ) : (
            <a href={item.href || "#"} className="hover:text-[#E94560] transition-colors">{item.label}</a>
          )}
        </span>
      ))}
    </nav>
  );
}
