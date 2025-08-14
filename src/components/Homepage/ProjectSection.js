import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projectData } from "../../data/projectData";

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      delay: i * 0.1,
    },
  }),
};

const ImageItem = ({ src, alt, title, slug, index }) => {
  if (!src || !slug) return null;
  const detailUrl = `/projects/${slug}`;

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      className="w-[300px] h-[300px]"
    >
      <Link to={detailUrl} className="block group w-full h-full">
        <div className="relative w-full h-full rounded-[14px] overflow-visible mx-auto">
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
                <p className="text-white text-[20px] font-extrabold text-center">
                  {title}
                </p>
              </div>

              <div className="absolute bottom-4 right-4">
                <button
                  className="
                    relative z-10
                    px-4 py-2.5
                    text-[15px] font-bold text-white
                    rounded-[6px]
                    bg-transparent
                    transition duration-300 ease-in-out
                    group-hover:bg-white/10
                    group-hover:backdrop-blur-md
                    group-hover:shadow-md
                  "
                  style={{
                    borderImage: "linear-gradient(90deg, #F9D923, #C3367C) 1",
                    borderStyle: "solid",
                    borderRadius: "6px",
                  }}
                >
                  See More →
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ProjectSection = () => {
  const navigate = useNavigate();
  const handleShowMore = () => navigate("/projects");

  const featuredProjects = projectData.slice(0, 6); // First 6 projects

  return (
    <section className="bg-gradient-to-l from-[#1B2435] to-black text-gray-300 py-16">
      <div className="text-center px-4 md:px-8 max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white flex justify-center items-center mb-4">
          <span className="mr-3 h-10 w-1.5 bg-brand-yellow"></span>
          OUR PROJECTS{" "}
        </h2>
        <p className="text-base md:text-lg text-gray-200">
          Featured insights stories of our transformations across services and
          industries. From concept to completion, stories of our transformations
          across services.
        </p>
      </div>

      {/* Cards grid with adjusted spacing */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center px-4 sm:px-6 mb-16">
        {featuredProjects.map((project, index) => (
          <ImageItem key={project.id} index={index} {...project} />
        ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center mt-6">
        <div className="relative group rounded-lg p-[2px] bg-gradient-to-r from-yellow-400 to-pink-500 w-fit">
          <button
            onClick={handleShowMore}
            className="
              relative z-10 
              px-6 py-3 
              rounded-lg 
              font-bold 
              text-white 
              text-[15px] 
              bg-gray-800 
              transition-all duration-300 
              group-hover:bg-gradient-to-r 
              group-hover:from-yellow-400 
              group-hover:to-pink-500
            "
          >
            Show More
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
