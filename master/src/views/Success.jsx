import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
import {
  active_stripe_connect_account,
  messageClear,
} from "../store/Reducers/sellerReducer";
const Success = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loader, errorMessage, successMessage } = useSelector(
    (state) => state.seller
  );
  const queryParams = new URLSearchParams(window.location.search);
  const activeCode = queryParams.get("activeCode");

  useEffect(() => {
    dispatch(active_stripe_connect_account(activeCode));
  }, [activeCode]);

  const redirect = () => {
    dispatch(messageClear());
    navigate("/");
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
      {loader ? (
        <FadeLoader />
      ) : errorMessage ? (
        <>
          <img src="/images/error.png" alt="error" />
          <button
            onClick={redirect}
            className="px-5 py-2 bg-green-500 rounded-sm text-white"
          >
            Back to Dashboard
          </button>
        </>
      ) : (
        successMessage && (
          <>
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src="/images/success.png"
                alt="success"
                style={{ width: "100%", height: "auto" }}
              />
              <button
                onClick={redirect}
                className="px-5 py-2 bg-green-500 rounded-sm text-white"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                Back to Dashboard
              </button>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Success;
