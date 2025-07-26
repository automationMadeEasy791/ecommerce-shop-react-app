import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiUser, FiSettings, FiShoppingBag, FiChevronDown } from "react-icons/fi";

const DropdownMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef();

  // Close dropdown on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-pink-500 hover:to-orange-500 transition-all duration-300 shadow-md"
      >
        Menu
        <FiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-52 origin-top-right rounded-lg shadow-lg bg-white ring-1 ring-black/5 animate-dropdown z-50">
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <button
                onClick={() => handleSelect("/profile")}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 transition"
              >
                <FiUser />
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSelect("/settings")}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 transition"
              >
                <FiSettings />
                Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSelect("/orders")}
                className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 transition"
              >
                <FiShoppingBag />
                Orders
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
