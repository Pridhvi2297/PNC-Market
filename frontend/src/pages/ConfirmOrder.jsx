import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
const load = async () => {
  return await loadStripe(
    "pk_test_51OL0XOG6sJWTPliWBf5y3akKfHBZv9XIy9Df8zo8ZyIYMcNHoOFWqTaLzbkwEEP2HUiR0pt6SyCnsc0piFymDtqZ001rd45xcb"
  );
};

const ConfirmOrder = () => {
  const [loader, setLoader] = useState(true);
  const [stripe, setStripe] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("succeeded");
          break;
        case "processing":
          setMessage("processing");
          break;
        case "requires_payment_method":
          setMessage("failed");
          break;
        default:
          setMessage("failed");
      }
    });
  }, [stripe]);

  const get_load = async () => {
    const tempStripe = await load();
    setStripe(tempStripe);
  };
  useEffect(() => {
    get_load();
  }, []);

  const update_payment = async () => {
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      try {
        await axios.get(`http://localhost:4000/api/order/confirm/${orderId}`);
        localStorage.removeItem("orderId");
        setLoader(false);
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  useEffect(() => {
    if (message === "succeeded") {
      update_payment();
    }
  }, [message]);

  return (
    <div className="w-screeen h-screen flex justify-center items-center flex-col gap-4">
      {message === "failed" || message === "processing" ? (
        <>
          <img src="/images/error.png" alt="error logo" />
          <Link
            className="px-5 py-2 bg-green-500 rounded-sm text-white"
            to="/dashboard/my-orders"
          >
            Back to Dashboard
          </Link>
        </>
      ) : message === "succeeded" ? (
        loader ? (
          <FadeLoader />
        ) : (
          <>
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src="/images/success.png"
                alt="error logo"
                style={{ width: "100%", height: "auto" }}
              />
              <Link
                to="/dashboard/my-orders"
                className="px-5 py-2 bg-green-500 rounded-sm text-white"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                Back to Dashboard
              </Link>
            </div>
          </>
        )
      ) : (
        <FadeLoader />
      )}
    </div>
  );
};

export default ConfirmOrder;
