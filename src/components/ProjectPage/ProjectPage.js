import React, { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { getProjectBySlug } from "../../data/projectData";
import { motion } from "framer-motion";

import Header from "../Homepage/Header";
import Footer from "../Homepage/Footer";

// Animation Variants
const fadeFromLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const fadeFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const fadeFromBottom = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const ProjectPage = () => {
  const { projectSlug } = useParams();
  const project = getProjectBySlug(projectSlug);

  useEffect(() => {
    document.title = "IntegralX - Project";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  if (!project) {
    console.warn(`Project with slug "${projectSlug}" not found.`);
    return <Navigate to="/" replace />;
  }

  return (
    <div
      id="project_page"
      className="bg-black text-white font-sans flex flex-col min-h-screen"
    >
      <Header />
      <main className="flex-grow py-16 md:py-20 px-4 sm:px-6 lg:px-8 lg:mx-auto">
        <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Section */}
          <motion.div
            className="text-gray-300 order-2 md:order-1 text-center md:text-left flex flex-col items-center md:items-start"
            variants={fadeFromLeft}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6">
              {project.subtitle}
            </h2>

            {/* Description */}
            <h3 className="text-lg font-bold text-white mt-8 mb-3 lg:text-2xl">
              Description:
            </h3>
            <p className="text-lg leading-relaxed font-normal mb-8 max-w-xl">
              {project.description}
            </p>

            {/* Key Features */}
            <div className="flex items-center mb-3 mt-8">
              <span className="mr-3 h-8 w-1.5 bg-yellow-400"></span>
              <h3 className="text-lg font-bold text-white lg:text-2xl">
                Key Features:
              </h3>
            </div>
            <ul className="list-disc list-inside space-y-2 mb-14 text-left">
              {project.keyFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            {/* Project Link Button */}
            {project.projectLink && project.projectLink !== "#" && (
              <motion.a
                href={project.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-4 rounded-lg font-semibold text-sm md:text-base text-white bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 transition duration-150 ease-in-out shadow-md active:scale-95 active:shadow-inner lg:mt-4"
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, delay: 0.3 },
                }}
              >
                View Project
              </motion.a>
            )}
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="flex justify-center items-center order-1 md:order-2 w-full"
            variants={fadeFromRight}
            initial="hidden"
            animate="visible"
          >
            <img
              src={project.detailImageSrc || project.src}
              alt={project.alt}
              className="rounded-lg shadow-xl w-full max-w-md lg:max-w-[630px] lg:max-h-[600px] object-contain"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Back to Projects Button */}
        <motion.div
          className="mt-12 flex justify-center"
          variants={fadeFromBottom}
          initial="hidden"
          animate="visible"
        >
          <Link
            to="/projects"
            className="px-12 py-4 rounded-lg font-semibold text-sm md:text-base text-white bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 transition duration-150 ease-in-out shadow-md active:scale-95 active:shadow-inner"
          >
            Back to Projects
          </Link>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectPage;
