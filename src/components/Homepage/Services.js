import React from "react";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";

const servicesData = [
  {
    id: "cloud",
    title: "Cloud Solutions",
    description:
      "Providing scalable and secure cloud-based services for storage and computing.",
    imageUrl: "/service-cloud.png",
  },
  {
    id: "custom",
    title: "Custom Software development",
    description:
      "Your Business Has Specific Needs, We Build Specific Solutions.",
    imageUrl: "/service-custom.png",
  },
  {
    id: "web",
    title: "Web Development",
    description: "If Google Can’t Find You, Neither Can Your Customers.",
    imageUrl: "/service-web.png",
  },
  {
    id: "ai",
    title: "AI Models Development and Automation",
    description: "Stop Doing Manual Work, Your Smart AI Workforce Is Ready.",
    imageUrl: "/service-ai.png",
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    description: "Your Brand in Every Customer's Pocket.",
    imageUrl: "/service-mobile.png",
  },
  {
    id: "blockchain",
    title: "Blockchain",
    description:
      "Developing forward-thinking blockchain solutions for enhanced security and transparency.",
    imageUrl: "/service-blockchain.png",
  },
  {
    id: "saas",
    title: "SaaS",
    description:
      "Delivering software applications over the cloud with maximum accessibility.",
    imageUrl: "/service-saas.png",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

const Services = () => {
  return (
    <section
      id="services"
      className="bg-gradient-to-l from-[#1B2435] to-black text-gray-300 py-16"
    >
      <motion.div
        className="text-center px-4 md:px-8 max-w-4xl mx-auto mb-12"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white flex justify-center items-center mb-4">
          <span className="mr-3 h-10 w-1.5 bg-brand-yellow"></span>
          OUR SERVICES
        </h2>
        <p className="text-base md:text-lg text-gray-200 mb-20">
          We offer end-to-end development, design and consulting for a wide
          range of technologies and industry.
        </p>
      </motion.div>

      <div className="w-full h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              className="flex items-center justify-center"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="relative w-[300px] h-[300px] rounded-[14px]">
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  imageUrl={service.imageUrl}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
