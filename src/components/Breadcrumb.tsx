import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center gap-1 text-sm text-[#6C757D] py-4">
      <Link href="/" className="hover:text-[#E94560] transition-colors">
        <Home size={14} />
      </Link>
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1">
          <ChevronRight size={12} />
          {i === items.length - 1 ? (
            <span className="text-[#16213E] font-medium">{item.label}</span>
          ) : (
            <Link href={item.href || "#"} className="hover:text-[#E94560] transition-colors">{item.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
