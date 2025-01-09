import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const Subscription = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const plans = [
    {
      title: "Lite",
      monthlyPrice: "$0",
      yearlyPrice: "$0",
      description:
        "Access at Author/Reader-Only Level to Embellisher eReader and Creator Editor & Sales Multimedia Landing Page Apps.",
      features: [
        "Access at Author/Reader-Only Level to Embellisher eReader",
        "Creator Editor & Sales Multimedia Landing Page Apps",
      ],
    },
    {
      title: "Basic",
      monthlyPrice: "$15",
      yearlyPrice: "$140",
      description:
        "Free access to Embellisher eReader and Creator Editor & Sales Multimedia Landing Page Apps at Author/Publisher Level. Access to marketing, coupons, and pricing of your ePub3 creations and other backend tools for your promotions and landing page multimedia ePub3 documents.",
      features: [
        "Five team members",
        "Full access to Global Replica Video Creator Platform (123 stock replicas & personal replica creator).",
        "Full access to Global Replica Video Conversation Creator Platform (7+ personas, 123 stock replicas and personal replica creator).",
        "3 free personal replicas",
        "25 new personal replicas per month",
        "Up to 3 concurrent conversations",
        "Content Moderation",
        "Bring your own audio",
        "Full access to Global Audience selection, campaign creation for social media marketing with up to seven different channels (Facebook, X, Instagram, Linkedin, YouTube, Pinterest and more to come). ",
        "Full access to scheduling and transmission of social media campaign, plus full monitoring of results.",
      ],
    },
    {
      title: "Plus+",
      monthlyPrice: "$55",
      yearlyPrice: "$500",
      description:
        "Free access to Embellisher eReader and Creator Editor & Sales Multimedia Landing Page Apps at Adminr/Publisher Level. Including user controls and control of organizing and labeling of your ePub3 promotion topics and descriptions for your clients.",
      features: [
        "Ten team members.",
        "Full access to Global Replica Video Creator Platform (123 stock replicas & personal replica creator).",
        "Full access to Global Replica Video Conversation Creator Platform (7+ personas, 123 stock replicas and personal replica creator).",
        "10 free personal replicas",
        "100 new personal replicas per month",
        "Conversation recording & transcripts",
        "Content Moderation",
        "Bring your own audio",
        "Full access to Global Audience selection, campaign creation for social media marketing with up to seven different channels (Facebook, X, Instagram, Linkedin, YouTube, Pinterest and more to come).",
        " Full access to scheduling and transmission of social media campaign, plus full monitoring of results.",
      ],
    },
  ];

  return (
    <section className="py-10 text-white max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 gap-2 items-center container">
      <button
        //   onClick={() => navigate("/get-started")}
        className="bg-gray-800 text-lg px-8 py-1 rounded-full hover:bg-gray-800 transition duration-300 mb-8 text-gray-300 mx-auto"
      >
        PRICING
      </button>
      <h3 className="text-4xl sm:text-4xl md:text-6xl mt-6 text-center">
        Simple and Affordable Pricing
      </h3>

      <div className="mt-6 text-xl text-gray-400 mb-10">
        There are many variations of passages of Lorem Ipsum available but the
        majority have suffered alteration in some form.
      </div>
      <div className="text-center mb-10">
        <div className="inline-flex items-center bg-gray-800 text-gray-300 rounded-full py-1 px-4">
          <button
            className={`px-4 py-2 rounded-full ${
              isMonthly ? "bg-gray-600 text-white" : ""
            }`}
            onClick={() => setIsMonthly(true)}
          >
            Monthly
          </button>
          <div
            className={`px-4 py-2 rounded-full ${
              !isMonthly ? "bg-gray-600 text-white" : ""
            }`}
          >
            <button onClick={() => setIsMonthly(false)}>Yearly</button>
            {!isMonthly && (
              <span className="text-blue-700 bg-gray-200 rounded-full text-sm px-2 py-1 ml-2">
                Save 30%
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white text-gray-800 rounded-2xl p-6 flex flex-col shadow-lg h-fit"
          >
            <h3
              className={`text-xl font-semibold mb-4 ${
                plan.title == "Plus+" ? " text-blue-500" : " "
              }`}
            >
              {plan.title}
            </h3>
            <div className="mb-4">{plan.description}</div>
            <p className="text-4xl font-bold mb-4">
              {isMonthly ? plan.monthlyPrice : plan.yearlyPrice}
            </p>
            <hr className="mb-4" />
            <ul className=" mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start mb-3">
                  <span className="text-blue-500 mr-2">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button
              className={` ${
                plan.title == "Plus+"
                  ? "bg-blue-500 text-white"
                  : " text-blue-500  border border-blue-500"
              } py-2 px-4 rounded-lg hover:bg-blue-600 transition flex justify-center`}
            >
              Start Free Trial
              <FiArrowUpRight className="ml-1" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Subscription;
