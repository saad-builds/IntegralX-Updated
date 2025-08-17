import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Hero from "./Hero";
import Services from "./Services";
import ProjectSection from "./ProjectSection";
import Testimonials from "./testimonials";
import Footer from "./Footer";
import { smoothScrollToIdWithOffset } from "../../utils/scrollUtils";
import ConsultationOffer from "./ConsultationOffer";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = "IntegralX - Home";
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      if (id) {
        smoothScrollToIdWithOffset(id, "main-header");
      }
    } else {
      if (location.pathname === "/" && !location.state?.fromHashLink) {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      }
    }
  }, [location.hash, location.pathname]);

  return (
    <>
      <Header />
      <Hero />
      <Services />
      {/* <ConsultationOffer /> */}
      <ProjectSection />
      <Testimonials />
      <Footer />
    </>
  );
};

export default HomePage;
