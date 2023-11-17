import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { BiLogInCircle, BiMenu } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { getNavs } from "../navigation/index";

const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const navs = getNavs("admin");
    setAllNav(navs);
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <div
        onClick={() => setShowSidebar(false)}
        className={`fixed duration-200 ${
          !showSidebar ? "invisible" : "visible"
        } w-screen h-screen bg-[#22292f80] top-0 left-0 z-10`}
      ></div>{" "}
      <div className={`w-[260px] fixed bg-black z-50 top-0 h-screen shadow-[0_0_15px_0_rgb(34_41_47_/_5%)] transition-all ${showSidebar ? 'left-0' : '-left-[260px] lg:left-0'}`}>
        <div className="h-[70px] flex justify-between items-center px-4">
          <Link to="/" className="w-[180px] h-[60px]">
            <img className="w-full h-full" src="/logo.png" alt="" />
          </Link>
          <button className="lg:hidden text-white" onClick={toggleSidebar}>
            <BiMenu size={30} />
          </button>
        </div>
        <div className="px-[16px] py-10">
          <ul>
            {allNav.map((n, i) => (
              <li key={i}>
                <Link
                  to={n.path}
                  className={`${
                    pathname === n.path
                      ? "bg-slate-600 shadow-indigo-500/30 text-white duration-500 "
                      : "text-[#d0d2d6] font-normal duration-200"
                  } px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 `}
                  onClick={() => setShowSidebar(false)} // Close sidebar on link click
                >
                  <span>{n.icon}</span>
                  <span>{n.title}</span>
                </Link>
              </li>
            ))}
            <li>
              <button
                className="text-[#d0d2d6] font-normal duration-200 px-[12px] py-[9px] rounded-sm flex justify-start items-center gap-[12px] hover:pl-4 transition-all w-full mb-1 "
                onClick={() => setShowSidebar(false)} // Close sidebar on button click
              >
                <span>
                  <BiLogInCircle />
                </span>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
