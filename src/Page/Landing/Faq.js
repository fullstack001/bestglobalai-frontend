import React, { useState, forwardRef } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "1. What is Best Global AI?",
      answer:
        "Best Global AI is a company that offers secure, cutting-edge AI solutions with a focus on APIs, transparency, and robust online security.",
    },
    {
      question: "2. What services does Best Global AI provide?",
      answer:
        "Best Global AI provides AI-driven solutions, including the Embellisher Suite, which offers ePub3 editing and marketing tools for content creators, publishers, and businesses.",
    },
    {
      question: "3. What is the Embellisher Suite?",
      answer:
        "The Embellisher Suite is Best Global AI's primary product, providing unrivaled ePub3 editing and marketing tools for content creators, publishers, and businesses.",
    },
    {
      question: "4. How does Best Global AI ensure online security?",
      answer:
        "Best Global AI ensures online security by installing secure Application Programming Interfaces (APIs) rather than relying on standalone AI applications, which can expose clients to potential vulnerabilities.",
    },
    {
      question: "5. What platforms does Best Global AI support?",
      answer:
        "Best Global AI's solutions are designed to be compatible with various platforms, including web and mobile applications, to meet the diverse needs of their clients.",
    },
    {
      question: "6. How can I get started with Best Global AI's services?",
      answer:
        "You can get started by visiting their website and exploring their products and services. For personalized assistance, you can contact their support team through the website's contact form.",
    },
    {
      question: "7. Does Best Global AI offer customer support?",
      answer:
        "Yes, Best Global AI offers customer support to assist clients with their products and services. You can reach out to them through the contact form on their website.",
    },
    {
      question:
        "8. Is there a trial version available for the Embellisher Suite?",
      answer:
        "For information about trial versions or demos of the Embellisher Suite, it's best to contact Best Global AI directly through their website's contact form.",
    },
    {
      question: "9. How does Best Global AI handle data privacy?",
      answer:
        "Best Global AI prioritizes data privacy and implements robust security measures to protect client data. For detailed information, you can refer to their privacy policy on their website.",
    },
    {
      question: "10. Can Best Global AI's solutions be customized?",
      answer:
        "Yes, Best Global AI offers customizable solutions to meet the specific needs of their clients. You can discuss your requirements with their team to tailor the services accordingly.",
    },
    {
      question: "11. What industries does Best Global AI serve?",
      answer:
        "Best Global AI serves a wide range of industries, including publishing, education, and businesses seeking AI-driven solutions for content creation and marketing.",
    },
    {
      question:
        "12. How does Best Global AI stay updated with the latest AI advancements?",
      answer:
        "Best Global AI stays updated with the latest AI advancements by continuously researching and integrating new technologies into their products and services to provide cutting-edge solutions to their clients.",
    },
    {
      question: "13. Are there any case studies or testimonials available?",
      answer:
        "For case studies or testimonials, you can visit Best Global AI's website or contact their team directly to learn more about their success stories and client experiences.",
    },
    {
      question: "14. How can I contact Best Global AI for more information?",
      answer:
        "You can contact Best Global AI by visiting their website and filling out the contact form. Their team will respond to your inquiries promptly.",
    },
    {
      question:
        "15. Does Best Global AI offer training or tutorials for their products?",
      answer:
        "For information about training or tutorials, it's recommended to reach out to Best Global AI directly through their website's contact form to inquire about available resources.",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-950 text-white font-sans">
      <Nav />
      <div className="container py-28 mx-auto max-w-6xl relative w-full min-h-screen ">
        <section className="py-20 text-white">
          <h3 className="text-5xl sm:text-4xl md:text-6xl mt-6 text-white text-center">
            Frequently Asked Questions
          </h3>

          <div className="mt-12 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800 text-white rounded-xl p-4 shadow-md cursor-pointer"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-2xl font-medium">{faq.question}</h4>
                  {activeIndex === index ? (
                    <FiChevronUp className="text-xl text-white" />
                  ) : (
                    <FiChevronDown className="text-xl text-white" />
                  )}
                </div>
                {activeIndex === index && (
                  <p className="mt-2 text-gray-400 text-left text-xl">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Faq;
