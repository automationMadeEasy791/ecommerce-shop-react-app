import React, { useContext, useEffect, useState, useRef } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Logo from "../img/logo.svg";
import Avatar from "../img/avatar.png";
import { BsBag } from "react-icons/bs";

const Header = () => {
  const [isActive, setIsActive] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const { isOpen, setIsOpen } = useContext(SidebarContext);
  const { itemAmount } = useContext(CartContext);
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`${
        isActive
          ? "bg-white py-6 shadow-lg"
          : "bg-gradient-to-r from-orange-100 to-yellow-200 py-8"
      } fixed w-full z-10 lg:px-12 transition-all duration-300`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/">
          <div className="w-[60px]">
            <img src={Logo} alt="Logo" />
          </div>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-10 text-lg font-medium">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-3 bg-white px-3 py-2 rounded-full hover:shadow-md transition duration-200 focus:outline-none"
              >
                <img
                  src={user?.avatar || Avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full border-2 border-indigo-500"
                />
                <span className="text-base font-semibold text-gray-800">
                  {user?.name || "User"}
                </span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-xl ring-1 ring-black/5 animate-dropdown z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    <li>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-indigo-100">
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders" className="block px-4 py-2 hover:bg-indigo-100">
                        Orders
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className="block px-4 py-2 hover:bg-indigo-100">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-5 py-2 rounded-full text-white bg-gradient-to-r from-fuchsia-500 to-orange-400 shadow-lg hover:from-orange-500 hover:to-fuchsia-600 transition duration-300 font-semibold"
            >
              Login
            </Link>
          )}

          {/* Cart */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer flex relative"
          >
            <BsBag className="text-4xl text-gray-700 hover:text-gray-900 transition duration-300" />
            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[22px] h-[22px] text-white rounded-full flex justify-center items-center font-bold">
              {itemAmount}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
