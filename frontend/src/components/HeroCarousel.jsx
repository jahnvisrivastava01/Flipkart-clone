import { useEffect, useState } from "react";

const HeroCarousel = ({ frames, intervalMs = 4000 }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || frames.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % frames.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [frames.length, intervalMs, paused]);

  const frame = frames[index];

  return (
    <div
      className="mb-4"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        key={index}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-[fadeInUp_0.6s_ease-out]"
      >
        {frame.map((b, i) => (
          <div
            key={`${index}-${i}`}
            className={`
              group
              relative
              overflow-hidden
              bg-gradient-to-br
              ${b.gradient}
              rounded-sm
              text-white
              p-6
              h-52
              flex
              flex-col
              justify-center
              transition-all
              duration-300
              hover:scale-[1.02]
              hover:shadow-lg
            `}
          >
            {/* Text */}
            <div className="relative z-10 max-w-[65%] transition-transform duration-300 group-hover:-translate-y-1">
              <h3 className="text-xl font-bold">
                {b.title}
              </h3>

              <p className="text-lg font-semibold mt-1">
                {b.subtitle}
              </p>

              <p className="text-sm text-white/80 mt-2">
                {b.tag}
              </p>
            </div>

            {/* Image */}
            {b.image && (
              <img
                src={b.image}
                alt=""
                onError={(e) => {
                  e.target.style.display = "none";
                }}
                className="
                  absolute
                  right-0
                  bottom-0
                  h-[85%]
                  w-[45%]
                  object-cover
                  rounded-tl-2xl
                  opacity-95
                  pointer-events-none
                  select-none
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:scale-105
                "
              />
            )}
          </div>
        ))}
      </div>

      {/* Carousel dots */}
      <div className="flex justify-center gap-2 mt-3">
        {frames.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`
              h-2
              rounded-full
              transition-all
              duration-300
              ${
                i === index
                  ? "w-6 bg-flipblue"
                  : "w-2 bg-gray-300 dark:bg-slate-600 hover:bg-gray-400"
              }
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;