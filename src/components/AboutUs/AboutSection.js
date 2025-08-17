import React from "react";
import {
  FiSearch,
  FiBarChart2,
  FiPenTool,
  FiCode,
  FiCheckCircle,
} from "react-icons/fi";
import { RiRocketLine } from "react-icons/ri";
import { motion } from "framer-motion";

// Animation config
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

function AboutSection() {
  return (
    <section className="bg-black text-gray-200 py-16 md:py-16">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Heading */}
        <div className="mb-16 md:mb-20 text-center">
          <h1 className="text-3xl lg:text-4xl font-semibold leading-tight max-w-4xl mx-auto">
            We specialize in building seamless,{" "}
            <span className="bg-gradient-to-l from-[#999999] via-[#999999_20%] to-[#FDCF00] bg-clip-text text-transparent">
              user-focused
            </span>{" "}
            solutions that turn ideas into powerful digital experiences and{" "}
            <span className="bg-gradient-to-l from-[#999999] via-[#999999_20%] to-[#FDCF00] bg-clip-text text-transparent">
              lasting impact.
            </span>
          </h1>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center px-8 sm:px-10 lg:px-20 relative z-10">
          <motion.div
            className="w-full"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <img
              src="/about-us-team.svg"
              alt="Team collaborating on laptops in a modern workspace"
              className="rounded-xl w-[380px] h-[380px] lg:w-[540px] lg:h-[480px] object-cover shadow-lg"
            />
          </motion.div>

          <motion.div
            className="space-y-8 md:space-y-16 lg:max-w-lg"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div>
              <h2 className="text-2xl lg:text-2xl font-semibold mb-3 text-white">
                Our Mission
              </h2>
              <p className="text-base font-normal text-[16px] leading-6">
                At IntegralX, our mission is to deliver smart, scalable digital
                solutions that align with your business goals. We aim to
                transform complex ideas into intuitive, high-impact platforms
                that drive growth, enhance user experiences, and build lasting
                value for our clients.
              </p>
            </div>

            <div>
              <h2 className="text-2xl lg:text-2xl font-semibold mb-3 text-white">
                Our Vision
              </h2>
              <p className="text-base font-normal text-[16px] leading-6">
                At IntegralX, we envision a future where innovation drives
                meaningful digital transformation. Our vision is to become a
                trusted partner for forward-thinking businesses by crafting
                technology that bridges creativity, functionality, and
                real-world impact.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Our Work Process Section */}
        <motion.div
          className="mt-24 relative z-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl lg:text-4xl font-semibold mb-3 text-center text-white">
            Our Work Process
          </h2>
          <p className="text-base max-w-2xl mx-auto mb-10 leading-7 text-center text-gray-300">
            We use a refined workflow that ensures smart planning, smooth
            development, and strong results.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* vertical dotted line */}
          <div
            className="process-line absolute top-10 bottom-10 left-1/2"
            style={{
              borderLeft: "2px dotted rgba(252,220,0,0.6)",
              transform: "translateX(-50%)",
            }}
          />
          <style jsx>{`
            @media (max-width: 419px) {
              .process-line {
                display: none;
              }
            }
          `}</style>

          {[
            {
              number: "01",
              title: "Discovery & Consultation",
              desc: "We start by understanding your goals, target audience, and requirements to shape the right approach.",
              Icon: FiSearch,
            },
            {
              number: "02",
              title: "Research & Planning",
              desc: "We conduct in-depth market and technical research to design a scalable, efficient strategy.",
              Icon: FiBarChart2,
            },
            {
              number: "03",
              title: "Wireframing & Prototyping",
              desc: "We create intuitive wireframes and interactive prototypes to visualize your solution early.",
              Icon: FiPenTool,
            },
            {
              number: "04",
              title: "Design & Development",
              desc: "Our team builds your product with clean code, responsive design, and modern frameworks.",
              Icon: FiCode,
            },
            {
              number: "05",
              title: "Testing & Quality Assurance",
              desc: "We rigorously test for performance, security, and reliability before launch.",
              Icon: FiCheckCircle,
            },
            {
              number: "06",
              title: "Launch & Ongoing Optimization",
              desc: "We deploy your solution and continuously monitor, update, and enhance it for long-term success.",
              Icon: RiRocketLine,
            },
          ].map((step, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <motion.div
                key={step.number}
                className={`relative flex flex-col md:flex-row items-start 
                              ${isEven ? "md:justify-end" : "md:justify-start"} 
                              mb-12`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div
                  className={`w-full md:w-3/4 
                                ${isEven ? "md:ml-auto" : "md:mr-auto"}
                                bg-gradient-to-br from-black to-gray-800 rounded-xl p-8 
                                shadow-[0_0_25px_rgba(245,240,10,0.55)]`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 font-semibold text-black">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <step.Icon
                          className="text-yellow-400"
                          size={20}
                          aria-hidden="true"
                        />
                        <h3 className="font-semibold text-lg text-white">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-sm">{step.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
