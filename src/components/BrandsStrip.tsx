const brands = ["NIKE", "ADIDAS", "PUMA", "REEBOK", "NEW BALANCE", "CONVERSE"];

export default function BrandsStrip() {
  return (
    <section className="py-10 bg-white border-y border-gray-100 dark:border-[#2D2D4A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40">
          {brands.map((brand) => (
            <span key={brand} className="text-lg md:text-2xl font-bold text-[#16213E] dark:text-[#F8F9FA] tracking-widest">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
