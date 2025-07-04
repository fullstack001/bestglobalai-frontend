import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import CheckoutForm from "./component/CheckoutForm";
import { clearExtra } from "../../store/getExtra";
import {extraData} from "../../lib/extraData";
import { use } from "react";

const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const brandPort = process.env.REACT_APP_BRAND_PORT;
const baseUrl = process.env.REACT_APP_API_PORT;
const stripePromise = loadStripe(stripeKey);

const ExtraPayment = ({ amount, currency }) => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedExtra, setSelectedExtra] = useState(null); 
  // const extra = useSelector((state) => state.extra);
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const extraIndex = new URLSearchParams(window.location.search).get("extraIndex");
  
  useEffect(() => {
    // Find the selected extra based on the extraIndex
    const foundExtra = extraData.find((item) => item.id === parseInt(extraIndex));
    setSelectedExtra(foundExtra); // Update the state
    console.log("Selected Extra:", foundExtra);
  }, [extraIndex]);
  

  const extraDelete = () => {
    setSelectedExtra(null);
  };

  const goHome = () => {
    extraDelete();
    // navigate("/");
    window.open(`${brandPort}`, "_self");

  };
  const hanldeAddCredit = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/extra/purchase-request`,
        {
          email,
          selectedExtra,
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Payment Successful");
        console.log("Payment success");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Payment Error: ", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl shadow-lg">
        <button onClick={goHome} className="text-blue-500 text-xl mb-4 block">
          ← Back
        </button>
        <h2 className="md:text-4xl text-3xl font-bold mb-6">Payment</h2>
        <div className="space-y-6 mb-6">
          <div className="mb-6">
            <p className="text-gray-700 sm:text-xl text-base">Chosen Service</p>
            <p className="text-3xl font-bold">{selectedExtra?.title} </p>
          </div>
          <div className="mb-6">
            <p className="text-gray-700 sm:text-xl text-base">Payment amount</p>
            <p className="text-3xl font-bold">$ {selectedExtra?.cost}</p>
          </div>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={selectedExtra?.cost} callBack={hanldeAddCredit} />
        </Elements>

        <div className="flex justify-center items-center mt-10 space-x-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/512px-Stripe_Logo%2C_revised_2016.svg.png?20210114172858"
            alt="PayPal"
            className="h-8 mx-4"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
            alt="MasterCard"
            className="h-6 mx-4"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt="Visa"
            className="h-6 mx-4"
          />
        </div>
      </div>
    </div>
  );
};

export default ExtraPayment;
