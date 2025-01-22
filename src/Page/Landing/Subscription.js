import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
const apiPort = process.env.REACT_APP_API_PORT;

const Subscription = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const plans = [
    {
      title: "Lite",
      monthlyPrice: 0,
      yearlyPrice: 0,
      descriptions: [
        "Access at Author/Reader-Only Level to Embellisher eReader and Creator Editor & Sales Multimedia Landing Page Apps.",
      ],
      features: [
        "Free access to Embellisher eReader and Creator Editor & Sales.",
        "Multimedia Landing Page Apps at Author/Publisher Level.",
        "Access to marketing, coupons, and pricing of your ePub3 creations and other backend tools for your promotions and landing page multimedia ePub3 documents.",
      ],
    },
    {
      title: "Basic",
      monthlyPrice: 15,
      yearlyPrice: 140,
      descriptions: [
        "Free access to Embellisher eReader and Creator Editor & Sales Multimedia Landing Page Apps at Author/Publisher Level. Access to marketing, coupons, and pricing of your ePub3 creations and other backend tools for your promotions and landing page multimedia ePub3 documents.",
      ],

      features: [
        "Five team members.",
        "Full access to Global Replica Video Creator Platform (1,060 stock replicas with 314 Talking Photos & Personal Replica Creator).",
        "Full access to Global Replica Video Conversation Creator Platform (7+ personas, 123 stock replicas and personal replica creator).",
        "3 free personal replicas.",
        "25 new personal replica creations per month.",
        "Up to 3 concurrent conversations.",
        "Content Moderation.",
        "Bring your own audio",
        "Full access to Global Audience selection, campaign creation for social media marketing with up to ten different channels (Facebook, X, Instagram, Linkedin, YouTube, Pinterest, Reddit, and more).",
        "Full access to scheduling and transmission of social media campaign, plus full monitoring/trafficking of results.",
      ],
    },
    {
      title: "Plus+",
      monthlyPrice: 55,
      yearlyPrice: 500,
      descriptions: [
        "Free access to Embellisher eReader and Creator Editor & Sales.",
        "Multimedia Landing Page Apps at Adminr/Publisher Level.",
        "Including user controls and control of organizing and labeling of your ePub3 promotion topics and descriptions for your clients.",
      ],
      features: [
        "Ten team members.",
        "Full access to Global Replica Video Creator Platform (1,060 stock replicas & personal replica creator).",
        "Full access to Global Replica Video Conversation Creator Platform (7+ personas with 314 Talking Photos & Personal Replica Creator).",
        "10 free personal replicas.",
        "100 new personal replicas per month.",
        "Conversation recording & transcripts.",
        "Content Moderation.",
        "Bring your own audio.",
        "Full access to Global Audience selection, campaign creation for social media marketing with up to ten different channels (Facebook, X, Instagram, Linkedin, YouTube, Pinterest, Reddit, and more).",
        "Full access to scheduling and transmission of social media campaigns, plus full monitoring/trafficking of results.",
      ],
    },
  ];

  const handlePayment = async (plan, method) => {
    if (method === "stripe") {
      try {
        const response = await fetch(`${apiPort}/api/payment/stripe`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan,
            price: isMonthly ? plan.monthlyPrice : plan.yearlyPrice,
            method,
            frequency: isMonthly ? "monthly" : "yearly",
            email: "jameschang1528@gmail.com",
          }),
        });

        const data = await response.json();
        console.log(data);

        window.location.href = data.sessionUrl;
      } catch (error) {
        console.error("Payment Error: ", error);
      }
    } else {
      try {
        const response = await fetch(`${apiPort}/api/payment/paypal`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan,
            price: isMonthly ? plan.monthlyPrice : plan.yearlyPrice,
            method,
            frequency: isMonthly ? "monthly" : "yearly",
          }),
        });

        const data = await response.json();
        console.log(data);
        window.location.href = data.approvalUrl;
      } catch (error) {
        console.error("Payment Error: ", error);
      }
    }
  };

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
        Start “Lite” and hone your promotional landing page skills, or get a
        “free trial” to one of our paid plans. We're here to help you every step
        of the way!
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
                plan.title === "Plus+" ? " text-blue-500" : " "
              }`}
            >
              {plan.title}
            </h3>
            <div className="mb-4">
                
            {plan.descriptions.map((description, i) => (
                <li key={i} className="flex items-start mb-3">
                  <span className="text-blue-500 mr-2">✔</span>
                  <span>{description}</span>
                </li>
              ))}
             </div>
            <p className="text-4xl font-bold mb-4">
              ${isMonthly ? plan.monthlyPrice : plan.yearlyPrice}{" "}
              <span className="text-2xl">{isMonthly ? "Month" : "Year"}</span>
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
              onClick={() => handlePayment(plan, "stripe")}
              className={` ${
                plan.title === "Plus+"
                  ? "bg-blue-500 text-white hover:text-blue-500"
                  : " text-blue-500  border border-blue-500"
              } py-2 px-4 rounded-lg hover:bg-blue-200 transition flex justify-center mb-2`}
            >
              Pay with Stripe <FiArrowUpRight />
            </button>
            {/* <button
              onClick={() => handlePayment(plan, "paypal")}
              className={` ${
                plan.title == "Plus+"
                  ? "bg-blue-500 text-white hover:text-blue-500"
                  : " text-blue-500  border border-blue-500"
              } py-2 px-4 rounded-lg hover:bg-blue-200 transition flex justify-center`}
            >
              Pay with PayPal
              <FiArrowUpRight className="ml-1" />
            </button> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Subscription;
