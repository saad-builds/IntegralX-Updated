import React, { useState } from "react";

const testimonialsData = [
  {
    id: 1,
    quote:
      "Hiring remotely seemed risky at first, with language and time zone barriers. But IntegralX made it completely seamless. Their communication was clear, their suggestions helpful, and delivery always on time. We've built a solid, ongoing partnership.",
    name: "Walter",
    title: "Founder ecobook.se",
    avatarSrc: "/testimonial1.jpg",
  },
  {
    id: 2,
    quote:
      "We needed a custom website with dashboards for both suppliers and dropshippers. IntegralX handled it professionally. They understood our needs, stayed on schedule, and exceeded our expectations. The final product was exactly what we wanted, smooth and hassle free.",
    name: "Muhammad Hammad",
    title: "Founder easydropship.net",
    avatarSrc: "/testimonial2.svg",
  },
  {
    id: 3,
    quote:
      "Our experience with IntegralX was excellent. They delivered the AnyPaper Pro platform on time and implemented every change we asked for without any issues. The support was consistent and reliable, helping us avoid downtime. Truly professional and dependable.",
    name: "Yousef",
    title: "CEO at ANYPAPER PRO",
    avatarSrc: "/testimonial1.svg",
  },
];

const TestimonialCard = ({ quote, name, title, avatarSrc }) => {
  return (
    <div className="p-1 bg-gradient-to-r from-[#C3367C] to-[#FDCF00] rounded-2xl w-full max-w-[800px] mx-auto transition-transform duration-300 ease-in-out">
      <div className="bg-black rounded-[calc(1rem-0.25rem)] p-6 flex flex-col md:flex-row items-center text-center md:text-left justify-center md:justify-start gap-6 md:gap-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full p-0.5 bg-gradient-to-br from-yellow-400 to-orange-500 mb-4">
            <img
              src={avatarSrc}
              alt={`${name}'s avatar`}
              className="w-full h-full rounded-full object-cover"
              loading="lazy"
            />
          </div>
          <h3 className="text-[15px] sm:text-[16px] font-semibold text-white mb-1">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400">{title}</p>
        </div>

        <div className="flex-1 mt-4 md:mt-0 relative">
          {/* Quote icon */}
          <div className="mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7.17 6.001A5.996 5.996 0 0 0 2 12v6h6v-6H5.26a3.993 3.993 0 0 1 3.91-5.999zM17.17 6.001A5.996 5.996 0 0 0 12 12v6h6v-6h-2.74a3.993 3.993 0 0 1 3.91-5.999z" />
            </svg>
          </div>

          <p className="text-sm sm:text-[15px] text-gray-300 leading-relaxed">
            "{quote}"
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [direction, setDirection] = useState("right");
  const [animating, setAnimating] = useState(false);
  const total = testimonialsData.length;

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setPrevIndex(current);
    setDirection("right");
    setCurrent((prev) => (prev + 1) % total);
    setTimeout(() => {
      setPrevIndex(null);
      setAnimating(false);
    }, 500);
  };

  const handlePrev = () => {
    if (animating) return;
    setAnimating(true);
    setPrevIndex(current);
    setDirection("left");
    setCurrent((prev) => (prev - 1 + total) % total);
    setTimeout(() => {
      setPrevIndex(null);
      setAnimating(false);
    }, 500);
  };

  return (
    <section
      id="testimonials"
      className="relative bg-gradient-to-l from-[#1B2435] to-black text-gray-300 py-14 lg:py-20"
    >
      <style>{`
        @keyframes slide-in-from-right {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-in-from-left {
          0% { transform: translateX(-100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        @keyframes slide-out-to-left {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes slide-out-to-right {
          0% { transform: translateX(0); opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        .slide-in-right {
          animation: slide-in-from-right 0.5s ease-out forwards;
        }
        .slide-in-left {
          animation: slide-in-from-left 0.5s ease-out forwards;
        }
        .slide-out-left {
          animation: slide-out-to-left 0.5s ease-in forwards;
        }
        .slide-out-right {
          animation: slide-out-to-right 0.5s ease-in forwards;
        }
      `}</style>

      <div className="relative z-10 max-w-screen-xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="mr-3 h-10 w-1.5 bg-yellow-400"></span>
            CLIENT TESTIMONIALS
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-white">
            We believe feedback drives innovation. Here's what our clients have
            to say about working with us.
          </p>
        </div>

        {/* Slider container */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative w-full max-w-[800px] min-h-[479px] sm:min-h-[400px] md:min-h-[290px] lg:min-h-[320px] overflow-hidden">
            {/* Outgoing card */}
            {prevIndex !== null && (
              <div
                key={`prev-${prevIndex}`}
                className={`absolute inset-0 ${
                  direction === "right" ? "slide-out-left" : "slide-out-right"
                } z-10`}
              >
                <TestimonialCard {...testimonialsData[prevIndex]} />
              </div>
            )}

            {/* Incoming card */}
            <div
              key={`current-${current}`}
              className={`absolute inset-0 ${
                direction === "right" ? "slide-in-right" : "slide-in-left"
              } z-20`}
            >
              <TestimonialCard {...testimonialsData[current]} />
            </div>
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={handlePrev}
              disabled={animating}
              className={`p-2 rounded-full transition duration-200 ${
                animating ? "bg-white/30" : "bg-white/50 hover:bg-white/80"
              } text-gray-800`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              disabled={animating}
              className={`p-2 rounded-full transition duration-200 ${
                animating ? "bg-white/30" : "bg-white/50 hover:bg-white/80"
              } text-gray-800`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
