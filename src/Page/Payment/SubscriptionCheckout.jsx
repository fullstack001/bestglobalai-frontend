import {
  useElements,
  useStripe,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

const baseUrl = process.env.REACT_APP_API_PORT;

function CheckoutForm({ priceId, email, callBack }) {
  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState("");

  const createSubscription = async () => {
    if (!stripe || !elements) {
      alert("Stripe is not loaded correctly.");
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment method
      const {
        paymentMethod,
        error: paymentMethodError,
      } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name,
          email,
        },
      });

      console.log("Payment Method Result:", paymentMethod);

      if (paymentMethodError) {
        console.error(
          "Error creating Payment Method:",
          paymentMethodError.message
        );
        setCardError(paymentMethodError.message);
        setIsProcessing(false);
        return;
      }

      if (!paymentMethod || !paymentMethod.id) {
        console.error("Payment Method ID is missing.");
        alert("Payment Method creation failed. Please try again.");
        setIsProcessing(false);
        return;
      }

      // Call backend to create subscription
      const response = await fetch(
        `${baseUrl}/api/subscription/create-subscription`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethodId: paymentMethod.id,
            name,
            email,
            priceId,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        alert("Failed to create subscription. Please try again.");
        setIsProcessing(false);

        return;
      }

      const {
        clientSecret,
        subscriptionId,
        error: serverError,
      } = await response.json();

      if (serverError) {
        alert(serverError.message);
        setIsProcessing(false);
        return;
      }

      // Confirm card payment
      const {
        paymentIntent,
        error: confirmError,
      } = await stripe.confirmCardPayment(clientSecret);

      if (confirmError) {
        alert(confirmError.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        callBack("stripe", subscriptionId);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("An unexpected error occurred. Please try again later.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid gap-4 m-auto">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-semibold text-gray-800">
          Card number
        </label>
        <CardNumberElement className="w-full p-3 border border-blue-600 rounded-md text-lg" />
        {cardError && (
          <div className="text-red-500 mt-1 text-sm">{cardError}</div>
        )}
      </div>
      <div className="flex justify-between gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-2 text-sm font-semibold text-gray-800">
            Expiration date
          </label>
          <CardExpiryElement className="w-full p-3 border border-blue-600 rounded-md text-lg" />
        </div>
        <div className="flex-1">
          <label className="block mb-2 text-sm font-semibold text-gray-800">
            CVC
          </label>
          <CardCvcElement className="w-full p-3 border border-blue-600 rounded-md text-lg" />
        </div>
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-semibold text-gray-800"
          htmlFor="name"
        >
          Card Holder Name
        </label>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md text-lg"
        />
      </div>
      <button
        onClick={createSubscription}
        disabled={!stripe || isProcessing}
        className="w-full py-3 bg-blue-600 text-white text-lg rounded-md cursor-pointer hover:bg-blue-700 disabled:bg-blue-500"
      >
        {isProcessing ? "Processing..." : "Subscribe"}
      </button>
    </div>
  );
}

export default CheckoutForm;
