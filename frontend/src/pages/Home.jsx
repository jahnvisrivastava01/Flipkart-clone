import { useEffect, useState } from "react";

import api from "../api/axios.js";

import ProductCard from "../components/ProductCard.jsx";

import HeroCarousel from "../components/HeroCarousel.jsx";

import PromoScroller from "../components/PromoScroller.jsx";

import { getCategoryIcon, ForYouIcon } from "../utils/categoryIcons.js";

const heroFrames = [
  [
    {
      title: "Makeup must haves",
      subtitle: "Up to 65% Off",
      tag: "Lakmé, Sotrue & more",
      gradient: "from-rose-500 to-orange-400",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
    },
    {
      title: "Premium nuts, pure joy",
      subtitle: "Up to 50% Off",
      tag: "Healthy snacking, redefined",
      gradient: "from-emerald-600 to-green-400",
      image:
        "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
    },
    {
      title: "4X faster absorption",
      subtitle: "Up to 50% Off",
      tag: "Flexible for better fit",
      gradient: "from-flipblue to-blue-400",
      image:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400",
    },
  ],
  [
    {
      title: "Big Billion Days",
      subtitle: "Up to 80% Off electronics",
      tag: "Mobiles, laptops & more",
      gradient: "from-indigo-600 to-violet-400",
      image:
        "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    },
    {
      title: "Fashion Fiesta",
      subtitle: "Flat 50-70% Off",
      tag: "Top brands, new arrivals",
      gradient: "from-pink-600 to-rose-400",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
    },
    {
      title: "Home Makeover",
      subtitle: "Starting at ₹299",
      tag: "Decor, storage & more",
      gradient: "from-flipgreen to-lime-400",
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400",
    },
  ],
];

const promoTiles = [
  {
    title: "Built better. Priced smarter.",
    subtitle: "From ₹1,399",
    gradient: "from-amber-700 to-orange-500",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300",
  },
  {
    title: "Powerful. Dark. Bold.",
    subtitle: "Min 50% Off",
    gradient: "from-slate-900 to-slate-700",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300",
  },
  {
    title: "Smells Like Favorites",
    subtitle: "Min 40% Off",
    gradient: "from-stone-800 to-stone-600",
    image:
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=300",
  },
  {
    title: "72H Oil-Free Scalp",
    subtitle: "Up to 40% Off",
    gradient: "from-cyan-600 to-teal-400",
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=300",
  },
  {
    title: "Compact, big on energy",
    subtitle: "Shop now",
    gradient: "from-sky-700 to-blue-500",
    image:
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=300",
  },
  {
    title: "Grocery Essentials",
    subtitle: "Up to 50% Off",
    gradient: "from-amber-500 to-yellow-400",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=300",
  },
  {
    title: "Kitchen Refresh",
    subtitle: "Up to 60% Off",
    gradient: "from-teal-700 to-emerald-500",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300",
  },
  {
    title: "Weekend Reads",
    subtitle: "Buy 2 Get 1 Free",
    gradient: "from-purple-700 to-fuchsia-500",
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300",
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products/categories").then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);

    const params = activeCategory ? { category: activeCategory } : {};

    api
      .get("/products", { params })
      .then((res) => setProducts(res.data.products))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="max-w-[1500px] mx-auto px-4 py-4">

      {/* Categories */}
      <div
        className="
          bg-white dark:bg-slate-800 rounded-sm shadow-sm
          flex md:justify-between gap-8 overflow-x-auto
          px-6 py-3 mb-4
          animate-[fadeIn_0.5s_ease-out]
        "
      >
        <button
          onClick={() => setActiveCategory("")}
          className={`group flex flex-col items-center gap-1 shrink-0 pb-1
            transition-all duration-300 hover:-translate-y-1
            ${
              activeCategory === ""
                ? "text-flipblue border-b-2 border-flipblue font-semibold"
                : "text-gray-700 dark:text-gray-300 hover:text-flipblue"
            }`}
        >
          <ForYouIcon
            size={24}
            className="transition-all duration-300 group-hover:scale-125"
          />

          <span className="text-xs whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
            For You
          </span>
        </button>

        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat);

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`group flex flex-col items-center gap-1 shrink-0 pb-1
                transition-all duration-300 hover:-translate-y-1
                ${
                  activeCategory === cat
                    ? "text-flipblue border-b-2 border-flipblue font-semibold"
                    : "text-gray-700 dark:text-gray-300 hover:text-flipblue"
                }`}
            >
              <Icon
                size={24}
                className="transition-all duration-300 group-hover:scale-125"
              />

              <span className="text-xs whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
                {cat}
              </span>
            </button>
          );
        })}
      </div>

      {/* Hero */}
      <div className="animate-[fadeInUp_0.6s_ease-out]">
        <HeroCarousel frames={heroFrames} />
      </div>

      {/* Promo tiles */}
      <div className="animate-[fadeInUp_0.7s_ease-out]">
        <PromoScroller tiles={promoTiles} />
      </div>

      {/* Section heading */}
      <div
        className="
          bg-gradient-to-r from-orange-400 to-flipaccent
          rounded-t-sm px-6 py-4
          mt-4
          transition-all duration-300
          hover:shadow-lg
        "
      >
        <h2 className="text-lg font-bold text-white">
          Trends you may like
        </h2>
      </div>

      {/* Products */}
      <div className="bg-white dark:bg-slate-800 rounded-b-sm shadow-sm p-4 mb-4">

        <h2
          className="
            text-lg font-medium mb-4
            dark:text-gray-100
            transition-all duration-300
          "
        >
          {activeCategory ? activeCategory : "Recommended for you"}
        </h2>

        {loading ? (
          <div className="flex justify-center py-10">
            <div
              className="
                w-8 h-8
                border-4 border-gray-200
                border-t-flipblue
                rounded-full
                animate-spin
              "
            />
          </div>
        ) : products.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No products found.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.map((p, index) => (
              <div
                key={p._id}
                className="animate-[fadeInUp_0.5s_ease-out]"
                style={{
                  animationDelay: `${index * 80}ms`,
                  animationFillMode: "both",
                }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;