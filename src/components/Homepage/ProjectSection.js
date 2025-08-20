import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { projectData } from "../../data/projectData";
import { MdOpenInNew } from "react-icons/md";
import { MdArrowForward  } from "react-icons/md";

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
                <Link to={detailUrl}>
                  <MdOpenInNew
                    size={30}
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

const ProjectSection = () => {
  const navigate = useNavigate();
  const handleShowMore = () => navigate("/projects");

  const featuredProjects = projectData.slice(0, 6); // First 6 projects

  return (
    <section className="bg-gradient-to-l from-[#1B2435] to-black text-gray-300 ">
      <div className="text-center px-4 md:px-8 max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white flex justify-center items-center mb-8">
          <span className="mr-3 h-10 w-1.5 bg-brand-yellow"></span>
          OUR PROJECTS{" "}
        </h2>
        <p className="text-base md:text-lg text-gray-200 mb-16">
          Our projects aren't just about great code, they're about solving the
          real challenges you face. Every solution is thoughtfully crafted to
          match your unique workflows, users,
          <br /> and long-term goals.
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
        <div className="flex justify-center mt-6">
  <button
    onClick={handleShowMore}
    className="
      flex items-center gap-2
      px-6 py-3 
      rounded-lg 
      font-bold 
      text-white 
      text-[15px]
      bg-gradient-to-r from-yellow-400 to-pink-500
      transition-all duration-300
      hover:brightness-110
    "
  >
    Show More
    <MdArrowForward  size={20} className="text-white" />
  </button>
</div>

      </div>
    </section>
  );
};

export default ProjectSection;
