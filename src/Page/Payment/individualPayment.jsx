import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CheckoutForm from "./component/CheckoutForm";
import individualData from "../../lib/individualData";


const stripeKey = process.env.REACT_APP_STRIPE_PUBLIC_KEY;
const brandPort = process.env.REACT_APP_BRAND_PORT;
const baseUrl = process.env.REACT_APP_API_PORT;
const stripePromise = stripeKey ? loadStripe(stripeKey) : Promise.reject(new Error("Stripe public key is missing"));

const IndividualPayment = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedIndividual, setSelectedIndividual] = useState(null); 
  const email = localStorage.getItem("email"); 
  const individual = individualData[0]; 

  useEffect(() => {     
    setSelectedIndividual(individual); // Update the state
    
  }, []);
  

  const extraDelete = () => {
    setSelectedIndividual(null);
  };

  const goHome = () => {
    extraDelete();  
    window.open(`${brandPort}`, "_self");
  };

  const hanldeAddCredit = async () => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/extra/individual-request`,
        {
          email,
          selectedIndividual,
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
            <p className="text-3xl font-bold">{selectedIndividual?.title} </p>
          </div>
          <div className="mb-6">
            <p className="text-gray-700 sm:text-xl text-base">Payment amount</p>
            <p className="text-3xl font-bold">$ {selectedIndividual?.cost}</p>
          </div>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm amount={selectedIndividual?.cost} callBack={hanldeAddCredit} />
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

export default IndividualPayment;
