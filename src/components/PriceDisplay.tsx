interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "lg";
}

export default function PriceDisplay({ price, originalPrice, size = "sm" }: PriceDisplayProps) {
  const priceClass = size === "lg" ? "text-2xl" : "text-xl";
  const originalClass = size === "lg" ? "text-lg" : "text-sm";

  return (
    <div className="flex items-center gap-2">
      <span className={`${priceClass} font-bold text-[#16213E] dark:text-[#F8F9FA]`}>${price.toFixed(2)}</span>
      {originalPrice && originalPrice > price && (
        <span className={`${originalClass} text-[#6C757D] dark:text-gray-400 dark:text-gray-500 line-through`}>${originalPrice.toFixed(2)}</span>
      )}
    </div>
  );
}
