import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] dark:bg-[#0F0F1A] px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-[#1A1A2E]/10 mb-6">404</div>
        <h1 className="text-3xl font-bold text-[#16213E] dark:text-[#F8F9FA] mb-3">Page Not Found</h1>
        <p className="text-[#6C757D] dark:text-gray-400 dark:text-gray-500 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-3.5 rounded-full bg-[#E94560] text-white font-semibold text-sm hover:bg-[#d63851] transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
