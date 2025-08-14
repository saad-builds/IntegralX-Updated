import React, { useEffect } from 'react';
import Header from '../Homepage/Header';
import Footer from '../Homepage/Footer';
import ContactForm from './ContactForm';
const ContactUsPage = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'auto' 
        });
      }, []);
       useEffect(() => {
    document.title = 'IntegralX - Contact Us';
  }, []);
  return (
    <>
      <div id="contact">
        <Header />
        <ContactForm />
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26268.818615498803!2d73.03492660572687!3d33.71313141281409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbe52dab1192f%3A0x44852214fbd71991!2sF-8%2C%20Islamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1745963791506!5m2!1sen!2s"
          className="h-[400px] w-full border-0"
          allowFullScreen="" 
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade" 
          title=" F-8, Islamabad, Pakistan"
        ></iframe>
        <Footer />
      </div>
    </>
  );
};

export default ContactUsPage;