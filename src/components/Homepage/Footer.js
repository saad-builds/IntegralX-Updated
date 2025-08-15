import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { addSubscription } from "../../services/api";
import { smoothScrollToIdWithOffset } from "../../utils/scrollUtils";

const Footer = () => {
  const quickLinksConfig = [
    { text: "Home", path: "/#hero", sectionId: "hero" },
    { text: "Services", path: "/#services", sectionId: "services" },
    { text: "Projects", path: "/projects" },
    { text: "About Us", path: "/about" },
    { text: "Contact Us", path: "/contact" },
  ];

  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState({
    loading: false,
    message: "",
    error: false,
  });

  const location = useLocation();

  const handleFooterLinkClick = (event, linkConfig) => {
    const { sectionId } = linkConfig;
    if (sectionId && location.pathname === "/") {
      event.preventDefault();
      smoothScrollToIdWithOffset(sectionId, "main-header", 0);
    }
  };

  const handleSubscribe = async (event) => {
    event.preventDefault();
    if (!email) {
      return setSubStatus({
        loading: false,
        message: "Please enter an email address.",
        error: true,
      });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return setSubStatus({
        loading: false,
        message: "Please enter a valid email address.",
        error: true,
      });
    }

    setSubStatus({ loading: true, message: "", error: false });
    try {
      const response = await addSubscription(email);
      setSubStatus({
        loading: false,
        message: response.message || "Subscription successful!",
        error: !response.success,
      });
      if (response.success) {
        setEmail("");
        setTimeout(
          () => setSubStatus({ loading: false, message: "", error: false }),
          5000
        );
      }
    } catch (err) {
      setSubStatus({
        loading: false,
        message: "Subscription failed. Please try again.",
        error: true,
      });
    }
  };

  const circleClasses =
    "bg-gray-800 border border-gray-800 rounded-full p-3 flex items-center justify-center transition-colors duration-200 hover:bg-gray-900";

  return (
    <>
      <div className="h-1.5 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400" />
      <footer className="bg-black text-gray-300 pt-12 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-8">
          {/* Left Section */}
          <div className="w-full lg:w-1/2 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-4xl md:text-6xl font-semibold text-white leading-tight">
                Let's
                <br />
                Connect.
              </h2>
              <img src="/Shape.svg" alt="shape" className="w-[60px] h-[60px]" />
            </div>
            <p className="text-sm md:text-[16px] text-[#878787] mb-6 max-w-md">
              We're your innovation partner, delivering cutting-edge solutions
              that elevate your business to the next level.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row w-full max-w-md mb-4"
            >
              <input
                type="email"
                placeholder="Email address"
                className="bg-[#F3F4F6] text-gray-900 placeholder-gray-500 px-4 py-3 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none flex-grow text-sm disabled:opacity-70"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subStatus.loading}
                required
              />
              <button
                type="submit"
                className="bg-[#C3367C] text-white px-4 py-3 rounded-md sm:rounded-r-md sm:rounded-l-none mt-2 sm:mt-0 font-semibold transition duration-300 disabled:opacity-60"
                disabled={subStatus.loading}
              >
                {subStatus.loading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            {subStatus.message && (
              <p
                className={`text-xs h-4 ${
                  subStatus.error ? "text-red-400" : "text-green-400"
                }`}
              >
                {subStatus.message}
              </p>
            )}

            {/* Social Icons */}
            <div className="flex justify-start mt-6 gap-4">
              <a
                href="https://www.instagram.com/integralx.tech/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className={circleClasses}
              >
                <FaInstagram className="text-yellow-400" size={22} />
              </a>
              <a
                href="https://www.facebook.com/people/IntegralXtech/61566634859509/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className={circleClasses}
              >
                <FaFacebookF className="text-yellow-400" size={22} />
              </a>
              <a
                href="https://www.linkedin.com/company/integralx/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className={circleClasses}
              >
                <FaLinkedin className="text-yellow-400" size={22} />
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 flex flex-col sm:flex-row items-start gap-12 lg:gap-12">
            {/* Quick Links */}
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-8 text-[18px]">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinksConfig.map((linkItem) => (
                  <li key={linkItem.text}>
                    <Link
                      to={linkItem.path}
                      onClick={(e) => handleFooterLinkClick(e, linkItem)}
                      className="text-[#B6BDB9] hover:text-yellow-200 text-[14px] transition duration-300"
                    >
                      {linkItem.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div className="flex-1">
              <h4 className="text-white font-semibold mb-8 text-[18px]">
                Contact Us
              </h4>
              <div className="space-y-6">
                {/* Phone Section */}
                <div className="flex items-center gap-3">
                  <a
                    href="tel:+923295100167"
                    className={circleClasses}
                  >
                    <FaPhoneAlt className="text-yellow-400" size={22} />
                  </a>
                  <div>
                    <p className="text-[16px] text-white font-medium">Phone</p>
                    <a
                      href="tel:+923295100167"
                      className="text-[14px] text-[#A4A4A4] hover:text-white transition duration-300"
                    >
                      +92-329-5100167
                    </a>
                  </div>
                </div>

                {/* Email Section */}
                <div className="flex items-center gap-3">
                  <a
                    href="mailto:integralx.tech@gmail.com"
                    className={circleClasses}
                  >
                    <FaEnvelope className="text-yellow-400" size={22} />
                  </a>
                  <div>
                    <p className="text-[16px] text-white font-medium">Email</p>
                    <a
                      href="mailto:integralx.tech@gmail.com"
                      className="text-[14px] text-[#A4A4A4] hover:text-white transition duration-300"
                    >
                      integralx.tech@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <hr className="border-t border-gray-700 my-8" />
        <div className="text-[14px] text-[#B6BDB9] text-center">
  © {new Date().getFullYear()}. All rights reserved.
</div>

      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/923295100167"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-4 right-3 md:bottom-14 md:right-8 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-xl z-50"
      >
        <FaWhatsapp size={38} />
      </a>
    </>
  );
};

export default Footer;
