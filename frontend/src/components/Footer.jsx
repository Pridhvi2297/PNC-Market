import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillShopping,
  AiFillHeart,
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
} from "react-icons/ai";
import { footerProductLinks, footerSupportLinks } from "../data/data";

const Footer = () => {
  const card_product_count = 10;
  const wishlist_count = 15;
  const userInfo = true;
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white">
      <div className="w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6">
        <div className="w-3/12 lg:w-4/12 sm:w-full">
          <div className="flex flex-col gap-3">
            <img
              className="w-72 h-[5.5rem] mb-6"
              src="/images/logo.png"
              alt="Company Logo"
            />
            <p className="text-white text-sm mb-6">
              Get the best products that bring happiness to your life.
            </p>
            <div className="flex space-x-4">
              <AiFillFacebook
                size={30}
                className="text-[#5ed17d] cursor-pointer"
              />
              <AiOutlineTwitter
                size={30}
                className="text-[#5ed17d] cursor-pointer"
              />
              <AiFillInstagram
                size={30}
                className="text-[#5ed17d] cursor-pointer"
              />
              <AiFillYoutube
                size={30}
                className="text-[#5ed17d] cursor-pointer"
              />
              <AiFillGithub
                size={30}
                className="text-[#5ed17d] cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="w-5/12 lg:w-8/12 sm:w-full">
          <div className="flex justify-center sm:justify-start sm:mt-6 w-full">
            <div>
              <div className="flex justify-between gap-[80px] lg:gap-[40px]">
                <ul className="space-y-2 flex flex-col gap-2 text-white text-sm">
                  <h2 className="text-xl font-semibold mb-4">Company</h2>
                  {footerProductLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.link}
                        className="text-gray-400 hover:text-teal-400 transition duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-col gap-2 text-white text-sm space-y-2">
                  <h2 className="text-xl font-semibold mb-4">Support</h2>
                  {footerSupportLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.link}
                        className="text-gray-400 hover:text-teal-400 transition duration-300"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/12 lg:w-full lg:mt-6">
          <div className="w-full flex flex-col justify-start gap-5">
            <h1 className="lg:text-3xl font-semibold mb-4 sm:mb-0">
              <span className="text-[#5ed17d]">Subscribe</span> for Exclusive
              Deals and Offers
            </h1>
            <div className="h-[50px] w-full border relative">
              <input
                type="email"
                placeholder="Enter your email..."
                className="w-full sm:w-72 bg-black text-gray-400 py-2.5 px-4 rounded-l-md focus:outline-none"
              />
              <button className="h-full absolute right-0 bg-[#5ed17d] text-white uppercase px-4 font-bold text-sm">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black text-gray-400 text-sm text-center py-4">
        <div className="container mx-auto">
          <p>© 2023 Pnc Mart. All rights reserved.</p>
          <p>Terms & Privacy Policy</p>
          <div className="flex justify-center space-x-4">
            <img
              src="https://help.zazzle.com/hc/article_attachments/360010513393/Logos-01.png"
              alt="Payment Methods"
              className="w-[20%] h-[10%]"
            />
          </div>
        </div>
      </div>

      <div className="hidden fixed md-lg:block w-[50px] bottom-3 h-[110px] right-2 bg-white rounded-full p-2">
        <div className="w-full h-full flex gap-3 flex-col justify-center items-center">
          <div
            onClick={() => navigate(userInfo ? "/cart" : "/login")}
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <span className="text-xl text-orange-500">
              <AiFillShopping />
            </span>
            {card_product_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {card_product_count}
              </div>
            )}
          </div>
          <div
            onClick={() =>
              navigate(userInfo ? "/dashboard/my-wishlist" : "/login")
            }
            className="relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]"
          >
            <span className="text-xl text-red-500">
              <AiFillHeart />
            </span>
            {wishlist_count !== 0 && (
              <div className="w-[20px] h-[20px] absolute bg-green-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]">
                {wishlist_count}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
