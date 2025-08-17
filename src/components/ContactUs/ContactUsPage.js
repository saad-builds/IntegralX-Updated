import React, { useEffect } from "react";
import Header from "../Homepage/Header";
import Footer from "../Homepage/Footer";
import ContactForm from "./ContactForm";

const ContactUsPage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
    document.title = "IntegralX - Contact Us";
  }, []);

  return (
    <div id="contact" className="bg-black text-white">
      <Header />
      <ContactForm />

      {/* Map Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white text-center">
      Our Location
    </h2>
    <p className="text-center max-w-3xl mx-auto text-gray-300 mb-8">
      Visit us at our office located in the heart of Islamabad, where our dedicated team is ready to assist you. Feel free to drop by or reach out for any inquiries.
    </p>
    <div className="overflow-hidden rounded-xl shadow-lg border border-gray-700">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26268.818615498803!2d73.03492660572687!3d33.71313141281409!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbe52dab1192f%3A0x44852214fbd71991!2sF-8%2C%20Islamabad%2C%20Pakistan!5e0!3m2!1sen!2s!4v1745963791506!5m2!1sen!2s"
        className="w-full h-[350px]"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="F-8, Islamabad, Pakistan"
      ></iframe>
    </div>
  </div>
</section>


      <Footer />
    </div>
  );
};

export default ContactUsPage;
