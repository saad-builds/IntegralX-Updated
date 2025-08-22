import React, { useState } from "react";

const testimonialsData = [
  {
    id: 1,
    quote:
      "Hiring remotely seemed risky at first, due to language and time zone barriers. But IntegralX made it completely seamless. Their communication was clear, their suggestions were helpful, and delivery always on time. We've built a solid, ongoing partnership that we greatly value.",
    name: "Walter",
    title: "Founder of ecobook.se",
    avatarSrc: "/00647958-bc1d-40f6-bc1a-e5edb2208523.png",
  },
  {
    id: 2,
    quote:
      "We needed a custom website with dashboards for both suppliers and dropshippers. IntegralX handled it professionally. They understood our needs, stayed on schedule, and exceeded our expectations. The final product was exactly what we wanted, smooth and hassle-free.",
    name: "Muhammad Hammad",
    title: "Founder easydropship.net",
    avatarSrc: "/testimonial2.svg",
  },
  {
    id: 3,
    quote:
      "Our experience with IntegralX was excellent. They delivered the AnyPaper Pro platform on time and implemented every change we requested without any issues. The support was consistent and reliable, helping us avoid downtime. Truly professional and dependable in every way.",
    name: "Yousef",
    title: "CEO at ANYPAPER PRO",
    avatarSrc: "/testimonial1.svg",
  },
];

const TestimonialCard = ({ quote, name, title, avatarSrc }) => {
  return (
    <div className="flex items-start justify-start flex-col text-justify gap-3 w-full max-w-[900px] mx-auto p-6">
      {/* Top section with vector icon + stars */}
      <div className="flex items-center justify-between w-full mb-2">
        {/* SVG icon */}
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-yellow-400 rotate-180"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M7.17 6.001A5.996 5.996 0 0 0 2 12v6h6v-6H5.26a3.993 3.993 0 0 1 3.91-5.999zM17.17 6.001A5.996 5.996 0 0 0 12 12v6h6v-6h-2.74a3.993 3.993 0 0 1 3.91-5.999z" />
          </svg>
        </div>

        {/* Stars */}
        <div className="text-yellow-400 flex items-center gap-1">
          <span className="sm:text-3xl text-2xl">★</span>
          <span className="sm:text-3xl text-2xl">★</span>
          <span className="sm:text-3xl text-2xl">★</span>
          <span className="sm:text-3xl text-2xl">★</span>
          <span className="sm:text-3xl text-2xl">★</span>
        </div>
      </div>

      {/* Quote text */}
      <p className="sm:text-base text-sm sm:!leading-loose leading-relaxed !font-extralight text-white text-opacity-75 tracking-wider">
        {quote}
      </p>

      {/* Divider with user info */}
      <div className="flex items-center justify-start gap-4 border-t border-b border-[#525252] py-6 mt-6 w-full">
        <img
          src={avatarSrc}
          alt={`${name} avatar`}
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
        <div>
          <h6 className="text-lg font-normal text-white">{name}</h6>
          <p className="text-sm sm:text-base text-white text-opacity-85 font-light break-words">
            {title}
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
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
         <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-white mb-8 flex items-start sm:items-center justify-center text-center">
  <span className="mr-3 w-1.5 bg-yellow-400 self-stretch"></span>
  CLIENT TESTIMONIALS
</h2>

          <p className="text-base md:text-lg text-gray-200 mb-16">
            We believe feedback drives innovation. Here's what our clients have
            to say about working with us.
          </p>
        </div>

        {/* Slider container */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="relative w-full max-w-[800px] mx-auto overflow-x-hidden">
            {/* Outgoing card */}
            {prevIndex !== null && (
              <div
                key={`prev-${prevIndex}`}
                className={`absolute top-0 left-0 w-full ${
                  direction === "right" ? "slide-out-left" : "slide-out-right"
                } z-10`}
              >
                <TestimonialCard {...testimonialsData[prevIndex]} />
              </div>
            )}

            {/* Incoming card */}
            <div
              key={`current-${current}`}
              className={`relative w-full ${
                direction === "right" ? "slide-in-right" : "slide-in-left"
              } z-20`}
            >
              <TestimonialCard {...testimonialsData[current]} />
            </div>
          </div>

          {/* Arrow Buttons */}
          <div className="flex items-center justify-center gap-4 mt-4">
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              disabled={animating}
              className={`p-2 rounded-full transition duration-200 bg-white/50 ${
                !animating ? "hover:bg-white/80" : ""
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

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={animating}
              className={`p-2 rounded-full transition duration-200 bg-white/50 ${
                !animating ? "hover:bg-white/80" : ""
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
