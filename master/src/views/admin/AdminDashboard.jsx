import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { RiProductHuntLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const data = {
    series: [
      {
        name: "Orders",
        data: [34, 65, 34, 65, 34, 34, 34, 56, 23, 67, 23, 45],
      },
      {
        name: "Revenue",
        data: [34, 32, 45, 32, 34, 34, 43, 56, 65, 67, 45, 78],
      },
      {
        name: "Sellers",
        data: [78, 32, 34, 54, 65, 34, 54, 21, 54, 43, 45, 43],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: { radius: 30 },
      chart: { background: "transparent", foreColor: "#d0d2d6" },
      dataLabels: { enabled: false },
      stroke: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#f0f0f0",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: { position: "top" },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apl",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: { bar: { horizontal: true } },
            chart: { height: "550px" },
          },
        },
      ],
    },
  };

  const statsData = [
    {
      title: "Total Sales",
      value: "1500",
      color: "#28c76f",
      icon: <BsCurrencyDollar className="text-[#28c76f] shadow-lg" />,
    },
    {
      title: "Products",
      value: "200",
      color: "#e000e8",
      icon: <RiProductHuntLine className="text-[#28c76f] shadow-lg" />,
    },
    {
      title: "Sellers",
      value: "20",
      color: "#00cfe8",
      icon: <FaUsers className="text-[#28c76f] shadow-lg" />,
    },
    {
      title: "Orders",
      value: "450",
      color: "#7367f0",
      icon: <AiOutlineShoppingCart className="text-[#28c76f] shadow-lg" />,
    },
  ];

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-5 bg-black rounded-md gap-3"
          >
            <div className="flex flex-col justify-start items-start text-[#d0d2d6]">
              <h2 className="text-3xl font-bold">{stat.value}</h2>
              <span className="text-md font-medium">{stat.title}</span>
            </div>
            <div
              className={`w-[46px] h-[47px] rounded-full bg-[${stat.color}1f] flex justify-center items-center text-xl`}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-black p-4 rounded-md">
            <Chart
              options={data.options}
              series={data.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-black p-4 rounded-md text-[#d0d2d6]">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
                Recent seller message
              </h2>
              <Link className="font-semibold text-sm text-[#d0d2d6]">
                View All
              </Link>
            </div>
            <div className="flex flex-col gap-2 pt-6 text-[#d0d2d6]">
              <ol className="relative border-1 border-slate-600 ml-4">
                <li className="mb-3 ml-6">
                  <div className="flex absolute -left-5 shadow-lg justify-center items-center w-10 h-10 p-[6px] bg-[#00d1e848] rounded-full z-10">
                    <img
                      className="w-full rounded-full h-full shadow-lg"
                      src="/images/seller.png"
                      alt=""
                    />
                  </div>
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-600 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <Link className="text-md font-normal">Hi</Link>
                      <time className="mb-1 text-sm font-normal sm:order-last sm:mb-0">
                        today
                      </time>
                    </div>
                    <div className="p-2 text-xs font-normal bg-slate-700 rounded-lg border border-slate-800">
                      Hi
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-4  bg-black rounded-md mt-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-lg text-[#d0d2d6] pb-3">
            Recent Orders
          </h2>
          <Link className="font-semibold text-sm text-[#d0d2d6]">View All</Link>
        </div>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  Order Id
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Order Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  scope="row"
                  className="py-3 px-4 font-medium whitespace-nowrap"
                >
                  ID
                </td>
                <td
                  scope="row"
                  className="py-3 px-4 font-medium whitespace-nowrap"
                >
                  Price
                </td>
                <td
                  scope="row"
                  className="py-3 px-4 font-medium whitespace-nowrap"
                >
                  <span>Deleivered</span>
                </td>
                <td
                  scope="row"
                  className="py-3 px-4 font-medium whitespace-nowrap"
                >
                  <span>payment status</span>
                </td>
                <td
                  scope="row"
                  className="py-3 px-4 font-medium whitespace-nowrap"
                >
                  <Link to={`/admin/dashboard`}>view</Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
