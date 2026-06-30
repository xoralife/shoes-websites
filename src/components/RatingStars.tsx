import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  showCount?: boolean;
  count?: number;
}

export default function RatingStars({ rating, size = 14, showCount, count }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.floor(rating) ? "fill-[#FEEFC0] text-[#FEEFC0]" : "text-gray-300"}
        />
      ))}
      {showCount && count !== undefined && (
        <span className="text-xs text-[#6C757D] ml-1">({count})</span>
      )}
    </div>
  );
}
