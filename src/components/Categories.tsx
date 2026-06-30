const categories = [
  { name: "Men", image: "M", color: "from-blue-400 to-blue-600" },
  { name: "Women", image: "W", color: "from-pink-400 to-pink-600" },
  { name: "Kids", image: "K", color: "from-yellow-400 to-yellow-600" },
  { name: "Sports", image: "S", color: "from-green-400 to-green-600" },
];

export default function Categories() {
  return (
    <section id="categories" className="py-20 bg-[#F8F9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-[#E94560] font-semibold text-sm tracking-wider uppercase">Categories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#16213E] mt-2">Shop By Category</h2>
          <p className="text-[#6C757D] mt-3 max-w-md mx-auto">
            Find the perfect pair for every occasion
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {categories.map(({ name, image, color }) => (
            <div
              key={name}
              className="group cursor-pointer flex flex-col items-center"
            >
              <div
                className={`w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br ${color} flex items-center justify-center card-hover card-shadow`}
              >
                <span className="text-5xl md:text-6xl font-bold text-white opacity-80">
                  {image}
                </span>
              </div>
              <h3 className="mt-5 font-semibold text-[#16213E] text-lg group-hover:text-[#E94560] transition-colors">
                {name}
              </h3>
              <p className="text-sm text-[#6C757D]">View Collection</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
