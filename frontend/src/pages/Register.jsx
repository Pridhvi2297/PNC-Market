import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headers from "../components/Headers";
import Footer from "../components/Footer";
import FadeLoader from "react-spinners/FadeLoader";
import { FaSquareFacebook, FaArrowRightFromBracket } from "react-icons/fa6";
import { ImGooglePlus2 } from "react-icons/im";

const Register = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const loader = false;

  return (
    <div>
      {loader && (
        <div className="w-screen h-screen flex justify-center items-center fixed left-0 top-0 bg-[#38303033] z-[999]">
          <FadeLoader />
        </div>
      )}
      <Headers />

      <div className="bg-slate-200 mt-4">
        <div className="w-full justify-center items-center p-10">
          <div className="grid grid-cols-2 w-[60%] mx-auto bg-white rounded-md">
            <div className="px-8 py-8">
              <h2 className="text-center w-full text-xl text-slate-600 font-bold">
                Register
              </h2>
              <div>
                <form className="text-slate-600">
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="name">Name</label>
                    <input
                      value={state.name}
                      type="text"
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                      id="name"
                      name="name"
                      placeholder="name"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <label htmlFor="email">Email</label>
                    <input
                      value={state.email}
                      type="email"
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                      id="email"
                      name="email"
                      placeholder="email"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-4">
                    <label htmlFor="password">Passoword</label>
                    <input
                      value={state.password}
                      type="password"
                      className="w-full px-3 py-2 border border-slate-200 outline-none focus:border-indigo-500 rounded-md"
                      id="password"
                      name="password"
                      placeholder="password"
                      required
                    />
                  </div>
                  <button className="px-8 w-full py-2 bg-purple-500 shadow-lg hover:shadow-indigo-500/30 text-white rounded-md">
                    Register
                  </button>
                </form>
                <div className="flex justify-center items-center py-2">
                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                  <span className="px-3 text-slate-600">or</span>
                  <div className="h-[1px] bg-slate-300 w-[95%]"></div>
                </div>
                <button className="px-8 w-full py-2 bg-indigo-500 shadow hover:shadow-indigo-500/30 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                  <span>
                    <FaSquareFacebook />
                  </span>
                  <span>Signup with Facebook</span>
                </button>
                <button className="px-8 w-full py-2 bg-orange-500 shadow hover:shadow-orange-500/30 text-white rounded-md flex justify-center items-center gap-2 mb-3">
                  <span>
                    <ImGooglePlus2 />
                  </span>
                  <span>Signup with Google</span>
                </button>
              </div>
              <div className="text-center text-slate-600 pt-1">
                <p>
                  Already have an account?{" "}
                  <Link className="text-blue-500 flex items-center justify-center" to="/login">
                    Sign in <FaArrowRightFromBracket className="ml-1" />
                  </Link>
                </p>
              </div>
            </div>
            <div className="w-full h-full py-4 pr-4">
              <img
                className="w-full h-[95%]"
                src="/images/register.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
