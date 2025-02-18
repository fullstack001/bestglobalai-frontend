import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import CheckoutForm from "./SubscriptionCheckout";
// import PayPalButton from "../SubscriptionPaypalButton";

import { clearPlan } from "../../store/goSubscription";

const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const baseUrl = process.env.REACT_APP_API_PORT;
const stripePromise = loadStripe(stripeKey);

const Payment = ({ month, currency }) => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);
  const plan = useSelector((state) => state.goSubscription);
  console.log(plan);
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");

  const stripePriceId = plan?.isMonthly ? plan?.monthlyId : plan?.yearlyId;

  const handlePurchaseSubscription = (subscriptionType, subscriptionId) => {
    axios
      .post(`${baseUrl}/api/subscription/add-subscription`, {
        email,
        frequency: plan.isMonthly ? "monthly" : "yearly",
        plan: plan.title,
        subscriptionId,
        subscriptionType,
      })
      .then((response) => {
        setSuccessMessage(`Your subscription payment processed successfully.`);
        console.log(response.data);
        dispatch(clearPlan());
        navigate("/profile");
      })
      .catch(() => {
        console.log("network error");
      });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
        <div className="flex justify-between items-center my-4">
          <h2 className="text-lg font-bold text-blue-600 mb-2">
            Secure Payment
          </h2>
        </div>
        {plan && (
          <div className="flex justify-between font-bold text-xl w-full text-gray-600 mb-4">
            <div>Selected Plan: {plan.title}</div>
            <div>
              {" "}
              Price: $ {plan?.isMonthly ? plan.monthlyPrice : plan.yearlyPrice}
            </div>
          </div>
        )}

        {successMessage ? (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            {successMessage}
          </div>
        ) : (
          <>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                priceId={stripePriceId}
                callBack={handlePurchaseSubscription}
                email={email}
              />
            </Elements>

            {/* <div className="mb-6">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="radio"
                  name="payment-method"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                  className="form-radio text-blue-600"
                />
                <div className="flex w-full justify-between items-center gap-2">
                  <span className="text-2xl font-semibold">PayPal</span>
                  <img src="/image/paypal.png" alt="paypal" className="h-8" />
                </div>
              </label> */}
            {/* {paymentMethod === "paypal" && (
                <PayPalButton
                  callback={handleAddCredit}
                  planId={coupon ? paypalDiscountPriceId : paypalPriceId}
                />
              )} */}
            {/* </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Payment;
