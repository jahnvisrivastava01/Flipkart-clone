import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PromoScroller = ({ tiles }) => {
  const scrollRef = useRef(null);

  const scrollByAmount = (amount) => {
    scrollRef.current?.scrollBy({
      left: amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mb-4 group">
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {tiles.map((t, i) => (
          <div
            key={i}
            className="
              group/card
              relative
              rounded-sm
              overflow-hidden
              h-36
              w-56
              shrink-0
              cursor-pointer
              transition-all
              duration-300
              ease-out
              hover:scale-[1.03]
              hover:-translate-y-1
              hover:shadow-lg
            "
          >
            {/* Background Image */}
            {t.image && (
              <img
                src={t.image}
                alt=""
                onError={(e) => {
                  e.target.style.display = "none";
                }}
                className={`
                  absolute
                  inset-0
                  w-full
                  h-full
                  object-cover
                  bg-gradient-to-br
                  ${t.gradient}
                  transition-transform
                  duration-500
                  ease-out
                  group-hover/card:scale-110
                `}
              />
            )}

            {/* Gradient Overlay */}
            <div
              className={`
                absolute
                inset-0
                bg-gradient-to-br
                ${t.gradient}
                ${t.image ? "opacity-40" : "opacity-100"}
              `}
            />

            {/* Dark Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Text */}
            <div
              className="
                relative
                z-10
                h-full
                flex
                flex-col
                justify-end
                p-4
                text-white
                transition-transform
                duration-300
                group-hover/card:-translate-y-1
              "
            >
              <p className="text-sm font-semibold leading-tight">
                {t.title}
              </p>

              <p className="text-xs text-white/80 mt-1">
                {t.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Left Button */}
      <button
        onClick={() => scrollByAmount(-260)}
        aria-label="Scroll left"
        className="
          hidden md:flex
          items-center
          justify-center
          absolute
          left-0
          top-1/2
          -translate-y-1/2
          -translate-x-1/2
          w-10
          h-10
          rounded-full
          bg-white
          dark:bg-slate-700
          shadow-lg
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-300
          hover:scale-110
        "
      >
        <FaChevronLeft className="text-gray-700 dark:text-gray-200" />
      </button>

      {/* Right Button */}
      <button
        onClick={() => scrollByAmount(260)}
        aria-label="Scroll right"
        className="
          hidden md:flex
          items-center
          justify-center
          absolute
          right-0
          top-1/2
          -translate-y-1/2
          translate-x-1/2
          w-10
          h-10
          rounded-full
          bg-white
          dark:bg-slate-700
          shadow-lg
          opacity-0
          group-hover:opacity-100
          transition-all
          duration-300
          hover:scale-110
        "
      >
        <FaChevronRight className="text-gray-700 dark:text-gray-200" />
      </button>
    </div>
  );
};

export default PromoScroller;