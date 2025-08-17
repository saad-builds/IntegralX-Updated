import React from "react";
import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";
import {
  FiGlobe,
  FiLock,
  FiLayers,
} from "react-icons/fi";
import { MdCloudQueue } from "react-icons/md";
import { IoCodeSlash } from "react-icons/io5";
import { LuBrainCircuit } from "react-icons/lu";
import { FaMobileAlt } from "react-icons/fa";
import { SiBlockchaindotcom } from "react-icons/si";


const servicesData = [
  {
    title: "Cloud Solutions",
    description:
      "Scalable and secure cloud-based services for storage, computing, and infrastructure to keep your business flexible and connected.",
    icon: MdCloudQueue ,
  },
  {
    title: "Custom Software Development",
    description:
      "Your business has specific needs, we build custom solutions designed to match your unique goals and workflows.",
    icon: IoCodeSlash ,
  },
  {
    title: "Web Development",
    description:
      "If Google can't find you, neither can your customers. We build fast, responsive, and SEO-friendly websites that make an impact.",
    icon: FiGlobe,
  },
  {
    title: "AI Models & Automation",
    description:
      "Stop doing manual work, Let AI handle the rest. We build smart, efficient solutions to streamline your processes and boost productivity.",
    icon: LuBrainCircuit,
  },
  {
    title: "Mobile App Development",
    description:
      "Put your brand in every customer's pocket with sleek, user-friendly apps that deliver performance and engagement on the go.",
    icon: FaMobileAlt,
  },
  {
    title: "Blockchain",
    description:
      "Forward-thinking blockchain solutions that offer better security, transparency, and decentralized control for your business.",
    icon: FiLock,
  },
  {
    title: "SaaS",
    description:
      "We create powerful SaaS products that are cloud-based, user-friendly, and built for accessibility and scale.",
    icon: FiLayers,
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
      className="bg-gradient-to-l from-[#1B2435] to-black text-gray-300 pt-16"
    >
      <motion.div
        className="text-center px-4 md:px-8 max-w-4xl mx-auto mb-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white flex justify-center items-center mb-8">
          <span className="mr-3 h-10 w-1.5 bg-brand-yellow"></span>
          OUR SERVICES
        </h2>
        <p className="text-base md:text-lg text-gray-200 mb-14">
          We offer end-to-end development, design and consulting for a wide
          range of technologies and industry.
        </p>
      </motion.div>

      <div className="w-full h-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
  {servicesData.map((service, index) => (
    <motion.div
      key={index}
      className={`flex items-center justify-center ${
        index === servicesData.length - 1 && servicesData.length % 3 !== 0
          ? "lg:col-span-3" // Center last card if it's alone
          : ""
      }`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative w-[300px] h-[300px] rounded-[14px]">
        <ServiceCard
          title={service.title}
          description={service.description}
          icon={service.icon}
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
