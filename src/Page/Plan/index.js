import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { plans } from "../../lib/plans"; // Importing available plans

import { setplan } from "../../store/goSubscription";

// Filter out the "Lite" plan from the available plans
const paidPlans = plans.filter((plan) => plan.title !== "Lite");

const PlanPage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user); // Get user details from Redux store
  const navigate = useNavigate();
  const subscription = user?.subscription;

  // State to toggle between monthly and yearly pricing
  const [isMonthly, setIsMonthly] = useState(true);
  const email = localStorage.getItem("email"); // Get email from localStorage

  // Function to handle the payment process
  const handlePayment = async (plan, method) => {
    dispatch(setplan({ ...plan, isMonthly }));

    if (email) {
      // If user is logged in, redirect to the payment page
      if (method === "stripe") {
        navigate("/payment");
      }
    } else {
      // If user is not logged in, redirect to the login page
      navigate("/login");
    }
  };

  return (
    <section className="py-10  text-white w-full mx-auto  grid grid-cols-1 gap-2 items-center container">
      {/* Pricing Toggle (Monthly / Yearly) */}
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

      {/* Plans List */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 gap-8 px-6">
        {paidPlans.map((plan, index) => (
          <div
            key={index}
            className="bg-white text-gray-800 rounded-2xl p-6 flex flex-col shadow-lg shadow-gray-800 h-fit"
          >
            <div className="flex justify-between">
              {/* Plan Title */}
              <h3
                className={`text-xl font-semibold mb-4 ${
                  plan.title === "Plus+" ? "text-blue-500" : ""
                }`}
              >
                {plan.title}
              </h3>
              {/* Pricing */}
              <p className="text-4xl font-bold mb-4">
                ${isMonthly ? plan.monthlyPrice : plan.yearlyPrice}{" "}
                <span className="text-2xl">{isMonthly ? "Month" : "Year"}</span>
              </p>
            </div>
            {/* Payment Button */}
            {subscription?.plan === plan.title ? (
              <div className="text-center my-6">
                <div className="text-xl text-green-400 font-semibold">
                  Expiry Date:{" "}
                  {new Date(subscription.expiryDate).toLocaleDateString()}
                </div>
                <div className="text-2xl text-green-400 font-semibold">
                  Current Plan
                </div>{" "}
              </div>
            ) : (
              <button
                onClick={() => handlePayment(plan, "stripe")}
                className={`${
                  plan.title === "Plus+"
                    ? "bg-blue-500 text-white hover:text-blue-500"
                    : "text-blue-500 border border-blue-500"
                } py-2 px-4 rounded-lg hover:bg-blue-200 transition flex justify-center my-10`}
              >
                Upgrade
              </button>
            )}

            {/* Plan Descriptions */}
            <div className="mb-4">
              {plan.descriptions.map((description, i) => (
                <li key={i} className="flex items-start mb-3">
                  <span className="text-blue-500 mr-2">✔</span>
                  <span>{description}</span>
                </li>
              ))}
            </div>

            {/* Features List */}
            <hr className="mb-4" />
            <ul className="mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start mb-3">
                  <span className="text-blue-500 mr-2">✔</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlanPage;
