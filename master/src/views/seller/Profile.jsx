import React, { useEffect, useState } from "react";
import { BsImages } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { PropagateLoader } from "react-spinners";
import { FadeLoader } from "react-spinners";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { overrideStyle } from "../../utils/utils";

const Profile = () => {
  const [state, setState] = useState({
    division: "",
    district: "",
    shopName: "",
    sub_district: "",
  });
  const dispatch = useDispatch();

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full flex flex-wrap">
        <div className="w-full md:w-6/12">
          <div className="w-full p-4  bg-[#283046] rounded-md text-[#d0d2d6]">
            <div className="flex justify-center items-center py-3">
              <label
                htmlFor="img"
                className="h-[210px] w-[300px] relative p-3 cursor-pointer overflow-hidden"
              >
                <img
                  className="w-full h-full"
                  src={"/images/customer.png"}
                  alt=""
                />
                <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                  <span>
                    <FadeLoader />
                  </span>
                </div>
              </label>{" "}
              :{" "}
              <label
                className="flex justify-center items-center flex-col h-[210px] w-[300px] cursor-pointer border border-dashed hover:border-indigo-500 border-[#d0d2d6] relative"
                htmlFor="img"
              >
                <span>
                  <BsImages />
                </span>
                <span>Select Image</span>
                <div className="bg-slate-600 absolute left-0 top-0 w-full h-full opacity-70 flex justify-center items-center z-20">
                  <span>
                    <FadeLoader />
                  </span>
                </div>
              </label>
              <input onChange={() => {}} type="file" className="hidden" id="img" />
            </div>
            <div className="px-0 md:px-5 py-2">
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span>
                <div className="flex gap-2">
                  <span>Name : </span>
                  <span>Pridhvinath</span>
                </div>
                <div className="flex gap-2">
                  <span>Email : </span>
                  <span>Pridhvinath@pncmart.com</span>
                </div>
                <div className="flex gap-2">
                  <span>Role : </span>
                  <span>Seller</span>
                </div>
                <div className="flex gap-2">
                  <span>Status : </span>
                  <span>Active</span>
                </div>
                <div className="flex gap-2">
                  <span>Payment Account : </span>
                  <p>1234567899</p>
                </div>
              </div>
            </div>
            <div className="px-0 md:px-5 py-2">
              <form onSubmit={() => {}}>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="Shop">Shop Name</label>
                  <input
                    value={state.shopName}
                    onChange={inputHandle}
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="text"
                    placeholder="shop name"
                    name="shopName"
                    id="Shop"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="div">Division</label>
                  <input
                    value={state.division}
                    onChange={inputHandle}
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="text"
                    placeholder="division"
                    name="division"
                    id="div"
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="district">District</label>
                  <input
                    value={state.district}
                    onChange={inputHandle}
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="text"
                    placeholder="district"
                    name="district"
                    id="district"
                  />
                </div>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="sub">Sub District</label>
                  <input
                    value={state.sub_district}
                    onChange={inputHandle}
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="text"
                    placeholder="sub district"
                    name="sub_district"
                    id="sub"
                  />
                </div>
                <button
                  disabled={false}
                  className="bg-blue-500 w-[190px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
                >
                  <PropagateLoader color="#fff" cssOverride={overrideStyle} />
                  {' Update Info'}
                </button>
              </form>{" "}
              :{" "}
              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-slate-800 rounded-md relative">
                <span className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50 absolute right-2 top-2 cursor-pointer">
                  <FaEdit />
                </span>
                <div className="flex gap-2">
                  <span>Shop Name : </span>
                  <span>PNC Mart</span>
                </div>
                <div className="flex gap-2">
                  <span>Division : </span>
                  <span>All</span>
                </div>
                <div className="flex gap-2">
                  <span>District : </span>
                  <span>Michigan</span>
                </div>
                <div className="flex gap-2">
                  <span>Sub District : </span>
                  <span>Grand Rapids</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-6/12">
          <div className="w-full pl-0 md:pl-7 mt-6 md:mt-0  ">
            <div className="bg-[#283046] rounded-md text-[#d0d2d6] p-4">
              <h1 className="text-[#d0d2d6] text-lg mb-3 font-semibold">
                Change Password
              </h1>
              <form>
                <div className="flex flex-col w-full gap-1 mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="email"
                    placeholder="email"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="o_password">Old Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    placeholder="old password"
                    name="old_password"
                    id="o_password"
                  />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="n_password">New Password</label>
                  <input
                    className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6]"
                    type="password"
                    placeholder="new password"
                    name="new_password"
                    id="n_password"
                  />
                </div>
                <button className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 mt-5">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
