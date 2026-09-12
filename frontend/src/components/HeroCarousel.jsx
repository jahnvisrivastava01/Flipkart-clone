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
    <div className="mb-4" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {frame.map((b, i) => (
          <div
            key={`${index}-${i}`}
            className={`page-fade-in relative overflow-hidden bg-gradient-to-br ${b.gradient} rounded-sm text-white p-6 h-52 flex flex-col justify-center hover:scale-[1.02] transition-transform duration-300`}
          >
            <div className="relative z-10 max-w-[65%]">
              <h3 className="text-xl font-bold">{b.title}</h3>
              <p className="text-lg font-semibold mt-1">{b.subtitle}</p>
              <p className="text-sm text-white/80 mt-2">{b.tag}</p>
            </div>
            {b.image && (
              <img
                src={b.image}
                alt=""
                onError={(e) => (e.target.style.display = "none")}
                className="absolute right-0 bottom-0 h-[85%] w-[45%] object-cover rounded-tl-2xl opacity-95 pointer-events-none select-none"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2 mt-3">
        {frames.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-flipblue" : "w-2 bg-gray-300 dark:bg-slate-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
