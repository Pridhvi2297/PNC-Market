import React, { useState } from "react";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
const Payment = () => {
  const price = 100;
  const items = 3;
  const orderId = 8687783678;
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  return (
    <div>
      <Headers />
      <section className="bg-[#eeeeee]">
        <div className="w-[85%] lg:w-[90%] md:w-[90%] sm:w-[90%] mx-auto py-16 mt-4">
          <div className="flex flex-wrap md:flex-col-reverse">
            <div className="w-7/12 md:w-full">
              <div className="pr-6 md:pr-0">
                <div className="flex flex-wrap">
                  <div
                    onClick={() => setPaymentMethod("stripe")}
                    className={`w-[20%] border-r cursor-pointer py-10 px-14 ${
                      paymentMethod === "stripe" ? "bg-white" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[10px] justify-center items-center">
                      <img
                        src="/images/stripe.png"
                        alt="stripe"
                        style={{ width: "100px", height: "50px" }}
                      />
                      <span className="text-slate-600 text-3xl">Stripe</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod("paypal")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "paypal" ? "bg-[#f8d45d]" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[10px] justify-center items-center">
                      <img
                        src="/images/paypal.png"
                        alt="paypal"
                        style={{ width: "100px", height: "60px" }}
                      />
                      <span className="text-slate-600 text-3xl">Paypal</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setPaymentMethod("venmo")}
                    className={`w-[20%] border-r cursor-pointer py-8 px-12 ${
                      paymentMethod === "venmo" ? "bg-[#008cff]" : "bg-slate-100"
                    }`}
                  >
                    <div className="flex flex-col gap-[10px] justify-center items-center">
                      <img
                        src="/images/venmo.png"
                        alt="venmo"
                        style={{ width: "100px", height: "60px" }}
                      />
                      <span className="text-slate-600 text-3xl">Venmo</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-5/12 md:w-full">
              <div className="pl-2 md:pl-0 md:mb-0">
                <div className="bg-white shadow p-5 text-slate-600 flex flex-col gap-3">
                  <h2>Order Summary</h2>
                  <div className="flex justify-between items-center">
                    <span>{items} items and shipping fee included</span>
                    <span>${price}</span>
                  </div>
                  <div className="flex justify-between items-center font-semibold">
                    <span>Total Amount</span>
                    <span className="text-lg text-orange-500">${price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Payment;
