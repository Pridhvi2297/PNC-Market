import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { BsEmojiSmile } from "react-icons/bs";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const SellerToCustomer = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { customerId } = useParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Add any necessary initialization logic
  }, []);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-black px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all`}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-black md:bg-transparent overflow-y-auto">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
                <h2>Customers</h2>
                <span
                  onClick={() => setShow(!show)}
                  className="block cursor-pointer md:hidden"
                >
                  <IoMdClose />
                </span>
              </div>
              <Link
                key={""}
                to={`/seller/dashboard/chat-customer/1`}
                className={`h-[60px] flex justify-start gap-2 items-center text-white px-2 py-2 rounded-sm cursor-pointer bg-slate-700`}
              >
                <div className="relative">
                  <img
                    className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                    src="/images/admin.png"
                    alt=""
                  />
                  <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0">
                    <div className="px-4">
                    Hello
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-start flex-col w-full">
                  <div className="flex justify-between items-center w-full">
                    <h2 className="text-base font-semibold">Test 1</h2>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex justify-between items-center">
              {customerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[42px] h-[42px] border-green-500 border-2 max-w-[42px] p-[2px] rounded-full"
                      src="/images/admin.png"
                      alt=""
                    />
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <h2 className="text-base text-white font-semibold">
                    Pridhvinath
                  </h2>
                </div>
              )}
              <div
                onClick={() => setShow(!show)}
                className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500/50 justify-center cursor-pointer items-center text-white"
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>
            <div className="py-4">
              <div className="bg-slate-800 h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {/* Message from customer */}
                <div ref={scrollRef} key={""} className="w-full flex justify-start items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div>
                      <img
                        className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                        src="/images/admin.png"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-orange-500 shadow-lg shadow-orange-500/50 text-white py-1 px-2 rounded-sm">
                      <span>Test 2</span>
                    </div>
                  </div>
                </div>

                {/* Message from seller */}
                <div ref={scrollRef} key={""} className="w-full flex justify-end items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div className="flex justify-center items-start flex-col w-full bg-blue-500 shadow-lg shadow-blue-500/50 text-white py-1 px-2 rounded-sm">
                      <span>Test 3</span>
                    </div>
                    <div>
                      <img
                        className="w-[38px] h-[38px] border-2 border-white rounded-full max-w-[38px] p-[3px]"
                        src="/images/admin.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                {/* Select Customer */}
                <div className="w-full h-full flex justify-center items-center flex-col gap-2 text-white">
                  <span>
                    <BsEmojiSmile />
                  </span>
                  <span>Select Customer</span>
                </div>
              </div>
            </div>
            <form onSubmit={""} className="flex gap-3">
              <input
                readOnly={customerId ? false : true}
                onChange={""}
                value={text}
                className="w-full flex justify-between px-2 border border-slate-700 items-center py-[5px] focus:border-blue-500 rounded-md outline-none bg-transparent text-[#d0d2d6]"
                type="text"
                placeholder="input your message"
              />
              <button
                disabled={customerId ? false : true}
                className="shadow-lg bg-cyan-500 hover:shadow-cyan-500/50 text-semibold w-[75px] h-[35px] rounded-md text-white flex justify-center items-center"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerToCustomer;