import React from "react";

const ServiceCard = ({ title, description, imageUrl }) => {
  return (
    <div className="group relative w-full h-full overflow-hidden rounded-xl shadow-lg">
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:brightness-75"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-all duration-500 group-hover:from-black/90 group-hover:via-black/70 group-hover:to-black/20"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center p-4 text-white">
        <div className="text-center max-w-[70%] mt-12">
          <h3 className="mb-4 text-lg font-semibold md:text-xl"> {/* increased from mb-2 to mb-4 */}
            {title}
          </h3>
          <p className="text-sm text-white md:text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard; 
