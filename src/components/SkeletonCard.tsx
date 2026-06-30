export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden card-shadow animate-pulse">
      <div className="aspect-square bg-gray-200 animate-shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4 animate-shimmer" />
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-shimmer" />
        <div className="h-6 bg-gray-200 rounded w-1/3 animate-shimmer" />
        <div className="h-10 bg-gray-200 rounded-xl animate-shimmer" />
      </div>
    </div>
  );
}
