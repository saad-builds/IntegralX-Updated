import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { smoothScrollToIdWithOffset } from "../../utils/scrollUtils";
import { SlCalender } from "react-icons/sl";

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoUrl = "/headerLogo.png";
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleNavClick = (event, pathWithHash) => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
    if (location.pathname === "/" && pathWithHash.startsWith("/#")) {
      event.preventDefault();
      const targetId = pathWithHash.substring(2);
      smoothScrollToIdWithOffset(targetId, "main-header", 0);
    }
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 right-0 z-50 bg-gradient-to-l from-[#1B2435] via-[#1B2435] to-black"
    >
      <div className="mx-auto px-2 sm:px-6 max-h-[100px] lg:px-8 flex justify-between items-center">
        <Link
          to="/"
          className="flex-shrink-0"
          onClick={() => isMobileMenuOpen && toggleMobileMenu()}
        >
          <img
            onClick={(e) => handleNavClick(e, "/#hero")}
            className="h-[100px] w-[100px]"
            src={logoUrl}
            alt="IntegralX Logo"
          />
        </Link>
        <nav className="hidden md:flex items-center space-x-5 lg:space-x-7">
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "/#hero")}
            className={`text-[16px] text-gray-200 underline decoration-transparent hover:decoration-brand-yellow hover:decoration-2 underline-offset-8 duration-300 font-bold ${
              location.pathname === "/"
                ? "decoration-brand-yellow decoration-2"
                : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/#services"
            onClick={(e) => handleNavClick(e, "/#services")}
            className={`text-[16px] text-gray-200 underline decoration-transparent hover:decoration-brand-yellow hover:decoration-2 underline-offset-8 duration-300 font-bold ${
              location.hash === "#services"
                ? "decoration-brand-yellow decoration-2"
                : ""
            }`}
          >
            Services
          </Link>
          <Link
            to="/projects"
            onClick={(e) => handleNavClick(e, "/projects")}
            className={`text-[16px] text-gray-200 underline decoration-transparent hover:decoration-brand-yellow hover:decoration-2 underline-offset-8 duration-300 font-bold ${
              location.pathname === "/projects"
                ? "decoration-brand-yellow decoration-2"
                : ""
            }`}
          >
            Projects
          </Link>
          <Link
            to="/about"
            onClick={() => isMobileMenuOpen && toggleMobileMenu()}
            className={`text-[16px] font-bold text-gray-200 underline decoration-transparent hover:decoration-brand-yellow hover:decoration-2 underline-offset-8 transition duration-300 ${
              location.pathname === "/about"
                ? "decoration-brand-yellow decoration-2"
                : ""
            }`}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            onClick={() => isMobileMenuOpen && toggleMobileMenu()}
            className="ml-4 p-0.5 rounded-lg bg-gradient-to-r from-[#F9D923] to-[#C3367C] group"
          >
            <button
              className="
      relative isolate overflow-hidden
      flex items-center gap-2
      px-4 py-2.5 rounded-[6px]
      text-[15px] font-bold text-white
      bg-gradient-to-r from-brand-yellow to-brand-pink
      before:content-['']
      before:absolute before:inset-0
      before:bg-gray-800
      before:rounded-[6px]
      before:-z-10
      before:opacity-100
      before:transition-opacity before:duration-600 before:ease-in-out
      hover:before:opacity-0
    "
            >
              Book A Demo Meeting
              <SlCalender className="text-lg" />
            </button>
          </Link>
        </nav>

        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-yellow"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            {!isMobileMenuOpen ? (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-4 sm:px-3 flex flex-col items-center bg-gray-800 bg-opacity-95 shadow-lg">
            <Link
              to="/"
              onClick={(e) => handleNavClick(e, "/#hero")}
              className="block px-3 py-2 rounded-md text-base font-bold text-gray-200 hover:text-brand-yellow hover:bg-gray-700"
            >
              Home
            </Link>
            <Link
              to="/#services"
              onClick={(e) => handleNavClick(e, "/#services")}
              className="block px-3 py-2 rounded-md text-base font-bold text-gray-200 hover:text-brand-yellow hover:bg-gray-700"
            >
              Services
            </Link>
            <Link
              to="/projects"
              onClick={(e) => handleNavClick(e, "/projects")}
              className="block px-3 py-2 rounded-md text-base font-bold text-gray-200 hover:text-brand-yellow hover:bg-gray-700"
            >
              Projects
            </Link>
            <Link
              to="/about"
              onClick={toggleMobileMenu}
              className="block px-3 py-2 rounded-md text-base font-bold text-gray-200 hover:text-brand-yellow hover:bg-gray-700"
            >
              About Us
            </Link>
            {/* <Link
                to="/blogs"
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-bold text-gray-200 hover:text-brand-yellow hover:bg-gray-700"
              >
                Blogs
              </Link> */}
            <Link
              to="/contact"
              onClick={toggleMobileMenu}
              className="block w-auto mt-3 mb-3 p-1 rounded-lg bg-gradient-to-r from-[#F9D923] to-[#C3367C] group transition duration-300 text-center"
            >
              <span className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-[6px] text-base font-bold text-white">
                Book A Demo Meeting
                <SlCalender className="text-lg" />
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
