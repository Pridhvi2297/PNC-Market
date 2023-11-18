import React, { useState, useEffect } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "../Pagination";
import Search from "../components/Search";
const Products = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
    };
  }, [searchValue, currentPage, parPage]);

  return (
    <div className="px-2 lg:px-7 pt-5 ">
      <div className="w-full p-4  bg-black rounded-md">
        <Search
          setParPage={setParPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
        <div className="relative overflow-x-auto mt-5">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Category
                </th>
                <th scope="col" className="py-3 px-4">
                  Brand
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Discount
                </th>
                <th scope="col" className="py-3 px-4">
                  Stock
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr key={""}>
                <td
                  scope="row"
                  className="py-1 px-4 font-medium whitespace-nowrap"
                >
                  {1}
                </td>
                <td
                  scope="row"
                  className="py-1 px-4 font-medium whitespace-nowrap"
                >
                  <img
                    className="w-[45px] h-[45px]"
                    src={
                      "https://m.media-amazon.com/images/I/81UKVHM77GL._AC_UY436_FMwebp_QL65_.jpg"
                    }
                    alt=""
                  />
                </td>
                <td
                  scope="row"
                  className="py-1 px-4 font-medium whitespace-nowrap"
                >
                  <span>Apple iPhone 15 Pro Max (256 GB) - Black Titanium</span>
                </td>
                <td
                  scope="row"
                  className="py-1 px-4 font-medium whitespace-nowrap"
                >
                  <span>Electronics</span>
                </td>
                <td
                  scope="row"
                  className="py-1 px-4 font-medium whitespace-nowrap"
                >
                  <span>Apple</span>
                </td>
                <td
                  scope="row"
                  className="py-1 px-4 font-medium whitespace-nowrap"
                >
                  <span>$1199</span>
                </td>
                <td
                  scope="row"
                  className="py-1 px-4 font-medium whitespace-nowrap"
                >
                  <span>$999</span>
                </td>
                <td
                  scope="row"
                  className="py-1 px-4 font-medium whitespace-nowrap"
                >
                  <span>30</span>
                </td>
                <td
                  scope="row"
                  className="py-1 px-4 font-medium whitespace-nowrap"
                >
                  <div className="flex justify-start items-center gap-4">
                    <Link
                      to={`/seller/dashboard/edit-product/1`}
                      className="p-[6px] bg-yellow-500 rounded hover:shadow-lg hover:shadow-yellow-500/50"
                    >
                      <FaEdit />
                    </Link>
                    <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                      <FaEye />
                    </Link>
                    <button className="p-[6px] bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            parPage={parPage}
            showItem={4}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
