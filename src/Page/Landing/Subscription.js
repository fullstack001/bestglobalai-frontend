import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { plans } from "../../lib/plans";
import { setplan } from "../../store/goSubscription";

const apiPort = process.env.REACT_APP_API_PORT;

const Subscription = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isMonthly, setIsMonthly] = useState(true);
  const email = localStorage.getItem("email");

  const handlePayment = async (plan, method) => {
    dispatch(setplan({ ...plan, isMonthly }));
    if (email) {
      if (method === "stripe") {
        navigate("/payment");
      } else {
        try {
          const response = await fetch(`${apiPort}/api/subscription/paypal`, {
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
    } else {
      navigate("/login");
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
              {plan.title === "Lite" ? "Try Free " : "Pay with Stripe "}{" "}
              <FiArrowUpRight />
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
