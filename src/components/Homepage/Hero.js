import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const slideData = [
  {
    id: 1,
    backgroundImageUrl: "/web-texture.jpeg", // your background image
    heading: (
      <>
        One-Stop for All <br /> Your <br /> Tech Solutions.
      </>
    ),
    paragraph:
      "Innovative, scalable, and future-ready solutions designed to elevate your business in the digital era.",
    buttonText: "Get in Touch",
  },
];

// Animation config
const container = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const Hero = () => {
  const navigate = useNavigate();
  const slide = slideData[0];

  const handleButtonClick = (text) => {
    if (text === "Get in Touch") navigate("/contact");
    if (text === "Explore More") navigate("/about");
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[80vh] lg:h-[87vh] overflow-hidden"
      style={{
        backgroundImage: `url(${slide.backgroundImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Centered content container */}
      <div className="relative z-10 flex flex-col h-full w-full items-center justify-center px-6 sm:px-12 lg:px-20">
        <motion.div
          className="w-full max-w-7xl text-white text-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="mb-8 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl drop-shadow-lg"
            variants={item}
          >
            {slide.heading}
          </motion.h1>

          <motion.p
            className="mb-8 max-w-3xl mx-auto text-base sm:text-lg text-gray-200 drop-shadow-md"
            variants={item}
          >
            {slide.paragraph}
          </motion.p>

          <motion.div variants={item}>
            <button
              className="rounded-md bg-gradient-to-r from-brand-yellow to-brand-pink px-10 py-4 font-semibold text-white transition duration-300 ease-in-out hover:opacity-90 drop-shadow-lg"
              onClick={() => handleButtonClick(slide.buttonText)}
            >
              {slide.buttonText}
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
