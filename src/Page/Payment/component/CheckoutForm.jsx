import React, { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";

const cardElementOptions = {
  style: {
    base: {
      fontSize: "20px",
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
    },
  },
};

const baseUrl = process.env.REACT_APP_API_PORT;

const CheckoutForm = ({ amount, callBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessingTo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cardError, setCardError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvcError, setCvcError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardNumberElement);
    const expiryElement = elements.getElement(CardExpiryElement);
    const cvcElement = elements.getElement(CardCvcElement);

    // Check for card number errors
    if (cardElement._complete !== true) {
      setCardError("Card number is incomplete or invalid.");
      setProcessingTo(false);
      return;
    } else {
      setCardError("");
    }

    // Check for expiry date errors
    if (expiryElement._complete !== true) {
      setExpiryError("Expiry date is incomplete or invalid.");
      setProcessingTo(false);
      return;
    } else {
      setExpiryError("");
    }

    // Check for CVC errors
    if (cvcElement._complete !== true) {
      setCvcError("CVC is incomplete or invalid.");
      setProcessingTo(false);
      return;
    } else {
      setCvcError("");
    }

    setProcessingTo(true);

    const res = await axios.post(`${baseUrl}/api/extra/create-payment-intent`, {
      amount: amount * 100, // Example amount in cents
    });
    const clientSecret = res.data;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setErrorMessage(error.message);
      setProcessingTo(false);
      toast.error(error.message);
      setProcessingTo(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        setProcessingTo(false);
        callBack();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <span className="block mb-2 text-sm font-medium text-gray-900">
          Card number
        </span>
        <CardNumberElement
          className="w-full  p-3 border border-blue-950 rounded-lg "
          options={cardElementOptions}
        />
        {cardError && <div className="text-red-500">{cardError}</div>}
      </div>
      <div className="sm:flex grid sm:justify-between gap-6  mt-4">
        <div className="w-full">
          <span>Expiration date</span>

          <CardExpiryElement
            className="w-full  p-3 border rounded-lg border-blue-950"
            options={cardElementOptions}
          />
          {expiryError && <div className="text-red-500">{expiryError}</div>}
        </div>
        <div className="w-full">
          <span>CVC</span>
          <CardCvcElement
            options={cardElementOptions}
            className="w-full  p-3 border rounded-lg border-blue-950"
          />
          {cvcError && <div className="text-red-500">{cvcError}</div>}
        </div>
      </div>
      <div className="mt-6 mb-8">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Card Holder Name
        </label>
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 p-3 border rounded-lg focus:outline-none "
        />
      </div>

      <button
        disabled={isProcessing}
        type="submit"
        className="w-full sm:text-2xl text-xl bg-blue-600 text-white py-3 rounded-lg"
      >
        {isProcessing ? (
          <img
            className="mx-auto w-8 "
            src="/spinners/spinner.svg"
            alt="spinner"
          />
        ) : (
          "Pay"
        )}
      </button>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
