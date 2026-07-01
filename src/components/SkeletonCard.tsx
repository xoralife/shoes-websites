export default function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-[#1A1A2E] rounded-2xl overflow-hidden card-shadow animate-pulse">
      <div className="aspect-square bg-gray-200 dark:bg-[#2D2D4A]" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-[#2D2D4A] rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-[#2D2D4A] rounded w-1/2" />
        <div className="h-5 bg-gray-200 dark:bg-[#2D2D4A] rounded w-1/3" />
        <div className="h-10 bg-gray-200 dark:bg-[#2D2D4A] rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
