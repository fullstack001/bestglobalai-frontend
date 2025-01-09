import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Lorem Ipsum dolor sit amet",
      answer: "Lorem Ipsum dolor sit amet",
    },
    {
      question: "Lorem Ipsum dolor sit amet",
      answer: "Lorem Ipsum dolor sit amet",
    },
    {
      question: "Lorem Ipsum dolor sit amet",
      answer: "Lorem Ipsum dolor sit amet",
    },
    {
      question: "Lorem Ipsum dolor sit amet",
      answer: "Lorem Ipsum dolor sit amet",
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 mt-24 text-center container">
      <button
        className="bg-gray-800 text-lg px-8 py-1 rounded-full hover:bg-gray-800 transition duration-300 mb-8 text-gray-300 mx-auto"
      >
        WE'VE GOT YOU COVERED
      </button>
      <h3 className="text-4xl sm:text-4xl md:text-6xl mt-6 text-white">
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
              <p className="mt-2 text-gray-400 text-left text-xl">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
