import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImGithub, ImGooglePlus2 } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <div className="min-w-screen min-h-screen bg-[#111729] flex justify-center items-center">
      <div className="w-[350px] text-[#e2e4e8] p-2">
        <div className="bg-[#283046] p-4 rounded-md">
          <h2 className="text-xl mb-3 text-center">PNC Marketplace</h2>
          <p className="text-sm mb-3 text-center">Sign In to your shop account</p>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="email">Email</label>
              <input
                onChange={inputHandle}
                value={state.email}
                className="px-3 py-2 outline-none border border-slate-200 bg-transparent rounded-md text-[#e2e4e8] focus:border-indigo-500 overflow-hidden"
                type="email"
                name="email"
                placeholder="email"
                id="email"
                required
              />
            </div>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Password</label>
              <input
                onChange={inputHandle}
                value={state.password}
                className="px-3 py-2 outline-none border border-slate-200 bg-transparent rounded-md text-[#e2e4e8] focus:border-indigo-500 overflow-hidden"
                type="password"
                name="password"
                placeholder="Password"
                id="password"
                required
              />
            </div>
            <button className="bg-blue-500 w-full hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
              Login
            </button>
            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Don't Have a account ? <Link to="/register"> Sing Up</Link>
              </p>
            </div>
            <div className="w-full flex justify-center items-center mb-3">
              <div className="w-[45%] bg-slate-700 h-[2px]"></div>
              <div className="w-[10%] flex justify-center items-center">
                <span className="pb-1">Or</span>
              </div>
              <div className="w-[45%] bg-slate-700 h-[2px]"></div>
            </div>
            <div className="flex justify-center items-center gap-3">
              <div className="w-[35px] h-[35px] flex rounded-md bg-green-600 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <ImGooglePlus2 size={30} />
                </span>
              </div>
              <div className="w-[35px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                <FaSquareFacebook size={30} />
                </span>
              </div>
              <div className="w-[35px] h-[35px] flex rounded-md bg-gray-600 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <BsTwitterX size={30} />
                </span>
              </div>
              <div className="w-[35px] h-[35px] flex rounded-md bg-green-600 shadow-lg hover:shadow-orange-700/50 justify-center cursor-pointer items-center overflow-hidden">
                <span>
                  <ImGithub size={30} />
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
