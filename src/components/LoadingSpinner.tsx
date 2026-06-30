export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-[#E94560]/20 border-t-[#E94560] rounded-full animate-spin" />
    </div>
  );
}
