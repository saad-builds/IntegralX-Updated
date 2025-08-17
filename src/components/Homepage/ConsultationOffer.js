import { FaCheckCircle } from "react-icons/fa";

const ConsultationOffer = () => {
  return (
    <section className="relative bg-gradient-to-r from-black to-[#1B2435] py-16 px-6 md:px-12 lg:px-20 text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        
        {/* Left Side - Text Content */}
        <div>
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Get a <span className="text-yellow-400">$300 value consultation</span> at no cost!
          </h2>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 mb-6">
            No pressure. No obligations. Just expert guidance to uncover opportunities and 
            map out the best solutions for your business.
          </p>

          {/* Key Benefits */}
          <ul className="space-y-3">
            {[
              "Personalized strategies for your business goals",
              "Expert insights on cloud, AI, apps, and more",
              "Actionable recommendations you can use right away",
            ].map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <FaCheckCircle className="text-yellow-400 mt-1" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side - CTA */}
        <div className="flex justify-center md:justify-end">
          <button
            className="px-10 py-5 rounded-xl font-bold text-xl 
                       text-white bg-gradient-to-r from-yellow-400 to-pink-500 
                       hover:from-yellow-500 hover:to-pink-600 
                       transition duration-500 ease-in-out 
                       transform hover:scale-105 shadow-lg"
          >
            Book Your Consultation
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConsultationOffer;
