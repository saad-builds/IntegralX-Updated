import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projectData } from "../../data/projectData";
import Header from "../Homepage/Header";
import Footer from "../Homepage/Footer";
import { MdOpenInNew } from "react-icons/md";


// Animation for each image card with stagger & scale on scroll
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: i * 0.1, // stagger delay based on index
    },
  }),
};

const ImageItem = ({ src, alt, title, slug, index }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, []);

  useEffect(() => {
    document.title = "IntegralX - projects";
  }, []);

  if (!src || !slug) return null;

  const detailUrl = `/projects/${slug}`;

  return (
    <motion.div
      className="block w-full sm:w-[48%] md:w-[362px]"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index} // pass index to variants for stagger delay
    >
      <Link to={detailUrl} className="group w-full">
        <div className="relative w-full max-w-[362px] h-[260px] sm:h-[300px] md:h-[362px] rounded-[14px] overflow-visible mx-auto">
          {/* Gradient outline on hover */}
          <div
            className="absolute -inset-1 rounded-[14px] opacity-0 group-hover:opacity-100 
                     bg-gradient-to-tr from-[#C3367C] to-[#F9D923] z-0 
                     transform scale-100 group-hover:scale-[1.03] 
                     transition-all duration-300"
          ></div>

          {/* Card content */}
          <div
            className="relative w-full h-full rounded-[12px] overflow-hidden 
                     bg-black shadow-lg 
                     transform scale-100 group-hover:scale-[1.03] 
                     transition-transform duration-300 z-10"
          >
            <img
              src={src}
              alt={alt}
              className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              loading="lazy"
            />

            {/* Overlay with title & button */}
            <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-between">
              {/* Title - center aligned */}
              <div className="flex-grow flex items-center justify-center">
                <p className="text-white text-[16px] sm:text-[18px] md:text-[20px] font-extrabold text-center">
                  {title}
                </p>
              </div>

         <div className="absolute bottom-4 right-4">
  <Link to={detailUrl}>
  <MdOpenInNew 
      size={36}
      className="text-white cursor-pointer transition-colors duration-300 group-hover:text-brand-yellow"
    />
  </Link>
</div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Projects = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-l from-[#1B2435] to-black text-gray-300 min-h-screen">
      <Header />

      {/* Banner */}
      <section className="relative w-full h-[50vh] lg:h-[45vh] flex items-center justify-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(/projectsbanner.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-8 md:px-12 lg:px-16 text-white">
          <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-4xl md:text-[42px] lg:text-[42px]">
            Our Projects
          </h1>
          <p className="mb-8 max-w-4xl text-base text-gray-200 sm:text-lg md:text-[22px] mx-auto lg:max-w-xl">
            Build for impact. Designed for you.
          </p>
        </div>
      </section>

      {/* Intro text */}
      <div className="mt-14 mb-16 md:mb-20 text-center">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-tight max-w-4xl mx-auto px-4">
          We believe in building purposeful,{" "}
          <span className="bg-gradient-to-l from-[#999999] via-[#999999_20%] to-[#FDCF00] bg-clip-text text-transparent">
            conversion-focused tools
          </span>{" "}
          that fuel growth and deliver{" "}
          <span className="bg-gradient-to-l from-[#999999] via-[#999999_20%] to-[#FDCF00] bg-clip-text text-transparent">
            lasting user loyalty{" "}
          </span>
          in every product.
        </h1>
      </div>

      {/* Project Cards */}
      <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6 pb-16 sm:pb-20">
        {projectData.map((project, index) => (
          <ImageItem key={project.id} index={index} {...project} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
