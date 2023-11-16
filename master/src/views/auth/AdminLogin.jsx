import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImGithub, ImGooglePlus2 } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";

const AdminLogin = () => {
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
            <div className="h-[70px] flex justify-center items-center">
            <img className="w-[60%] h-full" src="/images/logo.png" alt="Pnc Mart" />
            </div>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3 py-3">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
