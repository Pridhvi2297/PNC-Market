import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImGithub, ImGooglePlus2 } from "react-icons/im";
import { BsTwitterX } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";
import { FcShop } from "react-icons/fc";
import { useSelector, useDispatch } from "react-redux";
import { PropagateLoader } from "react-spinners";
import { overrideStyle } from "../../utils/utils";
import { seller_register, messageClear } from "../../store/Reducers/authReducer";
import toast from 'react-hot-toast'


const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage, userInfo } = useSelector((state) => state.auth);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(seller_register(state));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
    if (userInfo) {
      navigate("/");
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="min-w-screen min-h-screen bg-[#111729] flex justify-center items-center">
      <div className="w-[350px] text-[#e2e4e8] p-2">
        <div className="bg-[#283046] p-4 rounded-md">
          <h2 className="text-xl mb-3 text-center">PNC Marketplace</h2>
          <div className="flex items-center justify-center">
            <p className="text-sm mb-3">Start selling with us</p>
            <FcShop size={30} className="ml-2" />
          </div>
          <form onSubmit={submit}>
            <div className="flex flex-col w-full gap-1 mb-3">
              <label htmlFor="name">Full Name</label>
              <input
                onChange={inputHandle}
                value={state.name}
                className="px-3 py-2 outline-none border border-slate-200 bg-transparent rounded-md text-[#e2e4e8] focus:border-indigo-500 overflow-hidden"
                type="text"
                name="name"
                placeholder="Full Name"
                id="name"
                required
              />
            </div>
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
            <div className="flex items-center w-full gap-3 mb-3">
              <input
                className="w-4 h-4 text-blue-600 overflow-hidden bg-gray-100 rounded border-gray-300 focus: ring-blue-500"
                type="checkbox"
                required
              />
              <label htmlFor="checkbox">
                I agree to privacy policy & terms
              </label>
            </div>
            <button
              disabled={loader ? true : false}
              className="bg-blue-500 w-full hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
            >
              {loader ? (
                <PropagateLoader color="#fff" cssOverride={overrideStyle} />
              ) : (
                "SignUp"
              )}
            </button>
            <div className="flex items-center mb-3 gap-3 justify-center">
              <p>
                Already Have a account ? <Link to="/login"> Singin</Link>
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

export default Register;
