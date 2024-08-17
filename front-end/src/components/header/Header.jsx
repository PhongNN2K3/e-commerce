import React from "react";
import { FaOpencart, FaRegUserCircle, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-14">
        <div>
          <Link to="/">
            <img src={logo} width="80" alt="logo" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center w-full justify-between max-w-md border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm ở đây..."
            className="w-full focus:outline-none"
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer">
            <FaSearch />
          </div>
        </div>
        <div className="flex items-center justify-between gap-7">
          <div className="text-4xl cursor-pointer relative">
            <span>
              <FaOpencart />
            </span>
            <div className="bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-1 -right-1">
              <p className="text-sm">0</p>
            </div>
          </div>
          <div className="text-4xl cursor-pointer">
            <FaRegUserCircle />
          </div>
          <Link to="/login">
            <button className="bg-red-600 text-white rounded-full border-none px-4 py-2 transform hover:scale-110 transition duration-300 ease-in-out transform-origin-center will-change-transform">
              Đăng nhập
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
