import React from "react";

const AboutHero = () => {
  return (
    <section
      id="hero"
      className="relative w-full h-[60vh] lg:max-h-[50vh] lg:min-h-[50vh]"
    >
      <div
        className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out opacity-100 z-10"
        style={{
          backgroundImage: `url(/about-us-bg.svg)`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <div className="w-full max-w-6xl px-4 text-white sm:px-8 md:px-12 lg:px-16 text-center">
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-4xl md:text-[42px] lg:text-[42px]">
              About Us
            </h1>
            <p className="mb-8 max-w-4xl text-base text-gray-200 sm:text-lg md:text-[22px] mx-auto lg:max-w-xl">
              From design to deployment, IntegralX creates purposeful digital
              solutions that boost visibility and drive results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
