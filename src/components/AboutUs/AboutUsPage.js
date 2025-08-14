import React, { useEffect } from 'react';
import Header from '../Homepage/Header';
import AboutHero from './AboutHero';
import AboutSection from './AboutSection';
import Footer from '../Homepage/Footer';
const AboutPage = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto' 
        });
      }, []);
      useEffect(() => {
    document.title = 'IntegralX - About Us';
  }, []);
  return (
    <>
      <div id="about">
        <Header />
        <AboutHero />
        <AboutSection />
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;