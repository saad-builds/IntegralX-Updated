import React, { useState } from "react";
import { submitContactForm } from "../../services/api";
import { DateTime } from "luxon";
const bannerImageUrl = "/contact_img.svg";

function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingDateInput, setMeetingDateInput] = useState("");

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [zone, setZone] = useState("");
  const [submitStatus, setSubmitStatus] = useState({
    message: "",
    error: false,
  });
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    phone: "",
    meetingDate: "",
    message: "",
    general: "",
    zone: "",
  });

  const validateName = (value) => {
    if (/[0-9]/.test(value)) {
      return "Name cannot contain numbers.";
    }
    return "";
  };

  const validatePhoneCharacters = (value) => {
    if (value && !/^\+?\d*$/.test(value)) {
      return 'Phone number can only contain digits and an optional leading "+".';
    }
    return "";
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    const { value } = event.target;
    setPhone(value);
  };

  const handleMeetingDateChange = (event) => {
    const localValue = event.target.value; // "2025-06-26T14:30"
    setMeetingDateInput(localValue); // for input display

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const zonedDateTime = DateTime.fromFormat(
      localValue,
      "yyyy-MM-dd'T'HH:mm",
      { zone: "local" }
    );

    const adjustedToZone = zonedDateTime.setZone(timeZone);

    console.log("User Time Zone:", timeZone);
    console.log("Formatted Time with Zone:", adjustedToZone.toISO());

    // Save the full ISO version for backend
    setMeetingDate(adjustedToZone.toISO());
    setZone(timeZone);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ message: "", error: false });

    const newFormErrors = {
      name: "",
      email: "",
      phone: "",
      meetingDate: "",
      message: "",
      general: "",
      zone: "",
    };
    let hasError = false;
    const missingFieldsList = [];

    if (!name.trim()) {
      newFormErrors.name = "Name is required.";
      missingFieldsList.push("Name");
      hasError = true;
    } else {
      const nameValidationError = validateName(name);
      if (nameValidationError) {
        newFormErrors.name = nameValidationError;
        hasError = true;
      }
    }

    if (!email.trim()) {
      newFormErrors.email = "Email is required.";
      missingFieldsList.push("Email");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newFormErrors.email = "Please enter a valid email address.";
      hasError = true;
    }
    if (!phone.trim()) {
      newFormErrors.phone = "Phone number is required.";
      missingFieldsList.push("Phone Number");
      hasError = true;
    } else {
      const phoneCharError = validatePhoneCharacters(phone);
      if (phoneCharError) {
        newFormErrors.phone = phoneCharError;
        hasError = true;
      } else if (
        phone.trim() === "+" ||
        !/^\+?\d{7,15}$/.test(phone.trim().replace(/\s/g, ""))
      ) {
        newFormErrors.phone = "Please enter a complete and valid phone number.";
        hasError = true;
      }
    }
    if (!meetingDate) {
      newFormErrors.meetingDate = "Meeting date and time are required.";
      missingFieldsList.push("Meeting Date & Time");
      hasError = true;
    } else {
      const selectedDateTime = new Date(meetingDate);
      const comparisonNow = new Date();
      comparisonNow.setSeconds(0, 0);

      if (selectedDateTime < comparisonNow) {
        newFormErrors.meetingDate =
          "Meeting date and time cannot be in the past.";
        hasError = true;
      }
    }

    if (!message.trim()) {
      newFormErrors.message = "Message is required.";
      missingFieldsList.push("Message");
      hasError = true;
    }

    if (missingFieldsList.length > 0 && !hasError) {
      newFormErrors.general = `Please fill out the following required fields: ${missingFieldsList.join(
        ", "
      )}.`;
    } else if (hasError && !newFormErrors.general) {
      if (
        newFormErrors.meetingDate &&
        newFormErrors.meetingDate.includes("past")
      ) {
        newFormErrors.general =
          "Please correct the errors highlighted above, including the meeting time.";
      } else {
        newFormErrors.general = "Please correct the errors highlighted above.";
      }
    }
    if (hasError) {
      setFormErrors(newFormErrors);
      setIsSubmitting(false);
      return;
    }
    setFormErrors({
      name: "",
      email: "",
      phone: "",
      meetingDate: "",
      message: "",
      general: "",
      zone: "",
    });

    const formData = {
      name,
      email,
      phone,
      meetingDate,
      message,
      zone,
    };

    try {
      const response = await submitContactForm(formData);
      setSubmitStatus({
        message: response.message || "Message sent successfully!",
        error: false,
      });
      setName("");
      setEmail("");
      setPhone("");
      setMeetingDate("");
      setMessage("");
      setZone("");
      setTimeout(() => setSubmitStatus({ message: "", error: false }), 5000);
    } catch (err) {
      setSubmitStatus({
        message:
          err.response?.data?.error ||
          "Failed to send message. Please try again.",
        error: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getLocalDateTimeMin = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1); // move to tomorrow
    now.setHours(0, 0, 0, 0); // set time to start of the day
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <section className="bg-black font-sans">
      <div
        className="relative h-96 md:h-[50vh] bg-cover bg-center pt-16 pb-20"
        style={{ backgroundImage: `url(${bannerImageUrl})` }}
        aria-labelledby="get-in-touch-heading"
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <div className="w-full max-w-6xl px-4 text-white sm:px-8 md:px-12 lg:px-16 text-center">
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-4xl md:text-[42px] lg:text-[42px]">
              Get in Touch
            </h1>
            <p className="mb-8 max-w-4xl text-base text-gray-200 sm:text-lg md:text-[22px] mx-auto lg:max-w-xl">
              IntegralX is ready to provide the right solutions according to
              your need
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto bg-gradient-to-l from-[#1B2435] to-black rounded-2xl backdrop-blur-sm border border-white/10 p-8 md:p-12 -mt-10">
        <h2 className="text-[30px] font-semibold text-white text-center mb-8">
          Let's Talk Business
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 mb-6">
            <div>
              <label
                htmlFor="name"
                className="block text-[16px] font-medium text-gray-300 mb-2"
              >
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                placeholder="Your Name"
                className={`block w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 border rounded-lg disabled:opacity-70 ${
                  formErrors.name
                    ? "border-red-500 border-[2px]"
                    : "border-transparent"
                }`}
                value={name}
                onChange={handleNameChange}
                disabled={isSubmitting}
                aria-describedby={formErrors.name ? "name-error" : undefined}
                aria-required="true"
              />
              {formErrors.name && (
                <p id="name-error" className="text-red-400 text-xs mt-1">
                  {formErrors.name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-[16px] font-medium text-gray-300 mb-2"
              >
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                placeholder="Email Address"
                className={`block w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 border rounded-lg disabled:opacity-70 ${
                  formErrors.email
                    ? "border-red-500 border-[2px]"
                    : "border-transparent"
                }`}
                value={email}
                onChange={handleEmailChange}
                disabled={isSubmitting}
                aria-describedby={formErrors.email ? "email-error" : undefined}
                aria-required="true"
              />
              {formErrors.email && (
                <p id="email-error" className="text-red-400 text-xs mt-1">
                  {formErrors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone-number"
                className="block text-[16px] font-medium text-gray-300 mb-2"
              >
                Phone number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                autoComplete="tel"
                placeholder="+92 300 1234567"
                className={`block w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 border rounded-lg disabled:opacity-70 ${
                  formErrors.phone
                    ? "border-red-500 border-[2px]"
                    : "border-transparent"
                }`}
                value={phone}
                onChange={handlePhoneChange}
                disabled={isSubmitting}
                aria-describedby={formErrors.phone ? "phone-error" : undefined}
                aria-required="true"
              />
              {formErrors.phone && (
                <p id="phone-error" className="text-red-400 text-xs mt-1">
                  {formErrors.phone}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="schedule-datetime"
                className="block text-[16px] font-medium text-gray-300 mb-2"
              >
                Schedule a meeting (Date & Time){" "}
                <span className="text-red-400">*</span>
              </label>
              <input
                type="datetime-local"
                name="schedule-datetime"
                id="schedule-datetime"
                className={`block w-full px-4 py-3 bg-white text-gray-900 placeholder-gray-500 border rounded-lg appearance-none disabled:opacity-70 focus:ring-2 focus:border-yellow-400 ${
                  formErrors.meetingDate
                    ? "border-red-500 border-[2px]"
                    : "border-transparent"
                }`}
                value={meetingDateInput}
                onChange={handleMeetingDateChange}
                disabled={isSubmitting}
                min={getLocalDateTimeMin()}
                aria-describedby={
                  formErrors.meetingDate ? "meetingDate-error" : undefined
                }
                aria-required="true"
              />
              {formErrors.meetingDate && (
                <p id="meetingDate-error" className="text-red-400 text-xs mt-1">
                  {formErrors.meetingDate}
                </p>
              )}
            </div>
          </div>
          <div className="mb-8">
            <label
              htmlFor="message"
              className="block text-[16px] font-medium text-gray-300 mb-2"
            >
              Project description <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Your message..."
              className={`block w-full px-4 py-2 bg-white text-gray-900 placeholder-gray-500 border rounded-lg disabled:opacity-70 ${
                formErrors.message
                  ? "border-red-500 border-[2px]"
                  : "border-transparent"
              }`}
              value={message}
              onChange={handleMessageChange}
              disabled={isSubmitting}
              aria-describedby={
                formErrors.message ? "message-error" : undefined
              }
              aria-required="true"
            />
            {formErrors.message && (
              <p id="message-error" className="text-red-400 text-xs mt-1">
                {formErrors.message}
              </p>
            )}
          </div>
          <div className="text-left">
            <button
              type="submit"
              className="px-12 py-4 self-center md:self-start rounded-lg font-semibold text-sm md:text-base text-white bg-gradient-to-r from-yellow-400 to-pink-500 hover:from-yellow-300 hover:to-pink-400 focus:outline-none focus:ring-offset-gray-900 transition duration-300 ease-in-out shadow-md hover:shadow-lg lg:mt-4 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>
            {formErrors.general && !submitStatus.message && (
              <p className="text-red-400 text-sm mt-4">{formErrors.general}</p>
            )}
            {submitStatus.message && (
              <p
                className={`text-sm mt-4 ${
                  submitStatus.error ? "text-red-400" : "text-green-400"
                }`}
              >
                {submitStatus.message}
              </p>
            )}
          </div>
        </form>
      </div>
      <div className="pb-16"></div>
    </section>
  );
}

export default ContactSection;
