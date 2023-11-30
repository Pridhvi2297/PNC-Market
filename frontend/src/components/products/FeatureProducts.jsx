import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcLike, FcPackage, FcBinoculars } from "react-icons/fc";
import Ratings from "../Ratings";

const FeatureProducts = ({ products }) => {
  const add_wishlist = useState("6");
  const add_card = useState("6");

  return (
    <div className="w-[85%] flex flex-wrap mx-auto">
      <div className="w-full">
        <div className="text-center flex justify-center items-center flex-col text-4xl text-slate-600 font-bold relative pb-[45px]">
          <h2>Feature Products</h2>
          <div className="w-[100px] h-[4px] bg-[#7fad39] mt-4"></div>
        </div>
        <div className="w-full grid grid-cols-4 md-lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6">
          {products.map((p, i) => (
            <div className="border group transition-all duration-500 hover:shadow-md hover:-mt-3">
              <div className="relative overflow-hidden">
                {p.discount ? (
                  <div className="flex justify-center items-center absolute text-white w-[38px] h-[38px] rounded-full bg-red-500 font-semibold text-xs left-2 top-2">
                    {p.discount}%
                  </div>
                ) : (
                  ""
                )}
                <img
                  src={p.images[0]}
                  alt=""
                  className="sm:w-full w-full h-[200px]"
                />
                <ul className="flex transition-all duration-700 -bottom-10 justify-center items-center gap-2 absolute w-full group-hover:bottom-3">
                  <li
                    // onClick={() => add_wishlist()}
                    className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                  >
                    <FcLike />
                  </li>
                  <Link
                    to={`/product/details/dsfsc`}
                    className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                  >
                    <FcBinoculars />
                  </Link>
                  <li
                    // onClick={() => add_card()}
                    className="w-[38px] h-[38px] cursor-pointer bg-white flex justify-center items-center rounded-full hover:bg-[#7fad39] hover:text-white hover:rotate-[720deg] transition-all"
                  >
                    <FcPackage />
                  </li>
                </ul>
              </div>
              <div className="py-3 text-slate-600 px-2">
                <h2>{p.name}</h2>
                <div className="flex justify-start items-center gap-3">
                  <span className="text-lg  font-bold">${p.price}</span>
                  <div className="flex">
                    <Ratings ratings={p.rating} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;
