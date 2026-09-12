import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
  FaCaretDown,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  const { user, logout } = useAuth();
  const { totalQuantity } = useCart();
  const navigate = useNavigate();
  const navRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${encodeURIComponent(query)}`);
  };

  const toggleMenu = (name) => {
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  const closeMenu = () => setOpenMenu(null);

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      ref={navRef}
      className="
        bg-white
        dark:bg-slate-900
        sticky
        top-0
        z-50
        border-b
        border-gray-200
        dark:border-slate-700
        transition-colors
        duration-300
      "
    >
      <div className="max-w-[1500px] mx-auto flex items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="
            shrink-0
            transition-transform
            duration-200
            hover:scale-105
          "
        >
          <span className="text-flipblue text-2xl font-bold italic">
            Flipkart
          </span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="flex-1 max-w-2xl mx-8"
        >
          <div
            className="
              flex
              items-center
              gap-3
              bg-white
              dark:bg-slate-800
              border-2
              border-flipblue
              rounded-full
              px-4
              transition-all
              duration-200
              focus-within:shadow-md
              focus-within:scale-[1.01]
            "
          >
            <FaSearch
              className="text-gray-400 shrink-0"
              size={14}
            />

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Products, Brands and More"
              className="
                flex-1
                py-2.5
                text-sm
                outline-none
                bg-transparent
                text-gray-700
                dark:text-gray-100
                placeholder:text-gray-400
              "
            />
          </div>
        </form>

        {/* Right Side */}
        <div className="flex items-center gap-8 text-gray-700 dark:text-gray-200 shrink-0">

          <ThemeToggle />

          {/* USER / LOGIN */}
          {user ? (
            <div className="relative">

              <button
                onClick={() => toggleMenu("user")}
                className="
                  flex
                  items-center
                  gap-1.5
                  font-medium
                  transition-all
                  duration-200
                  hover:text-flipblue
                "
              >
                <FaUserCircle size={18} />
                {user.name.split(" ")[0]}
                <FaCaretDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    openMenu === "user" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openMenu === "user" && (
                <div
                  className="
                    absolute
                    right-0
                    top-full
                    mt-2
                    bg-white
                    dark:bg-slate-800
                    text-gray-800
                    dark:text-gray-100
                    rounded
                    shadow-lg
                    w-48
                    z-50
                    border
                    border-gray-100
                    dark:border-slate-700
                    animate-[fadeIn_0.2s_ease-out]
                  "
                >
                  <Link
                    to="/orders"
                    onClick={closeMenu}
                    className="
                      block
                      px-4
                      py-2
                      hover:bg-gray-50
                      dark:hover:bg-slate-700
                      text-sm
                      transition-colors
                      duration-150
                    "
                  >
                    My Orders
                  </Link>

                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={closeMenu}
                      className="
                        block
                        px-4
                        py-2
                        hover:bg-gray-50
                        dark:hover:bg-slate-700
                        text-sm
                        transition-colors
                        duration-150
                      "
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="
                      w-full
                      text-left
                      px-4
                      py-2
                      hover:bg-gray-50
                      dark:hover:bg-slate-700
                      text-sm
                      text-red-600
                      transition-colors
                      duration-150
                    "
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">

              <button
                onClick={() => toggleMenu("login")}
                className="
                  flex
                  items-center
                  gap-1.5
                  font-medium
                  transition-all
                  duration-200
                  hover:text-flipblue
                "
              >
                <FaUserCircle size={18} />
                Login

                <FaCaretDown
                  size={12}
                  className={`transition-transform duration-200 ${
                    openMenu === "login" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openMenu === "login" && (
                <div
                  className="
                    absolute
                    right-0
                    top-full
                    mt-3
                    z-50
                    w-44
                    animate-[fadeIn_0.2s_ease-out]
                  "
                >
                  <div className="bg-flipblue rounded shadow-lg relative">

                    <div className="absolute -top-1.5 right-7 w-3 h-3 bg-flipblue rotate-45" />

                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="
                        block
                        text-center
                        py-2.5
                        text-white
                        font-medium
                        hover:bg-blue-700
                        rounded
                        transition-colors
                        duration-150
                      "
                    >
                      Login
                    </Link>
                  </div>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="
                      block
                      text-center
                      mt-2
                      bg-white
                      dark:bg-slate-800
                      border
                      border-gray-200
                      dark:border-slate-700
                      text-flipblue
                      text-sm
                      py-2
                      rounded
                      shadow
                      transition-all
                      duration-200
                      hover:shadow-md
                      hover:-translate-y-0.5
                    "
                  >
                    New Customer? Sign Up
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* MORE */}
          <div className="relative hidden md:block">

            <button
              onClick={() => toggleMenu("more")}
              className="
                flex
                items-center
                gap-1.5
                font-medium
                transition-all
                duration-200
                hover:text-flipblue
              "
            >
              More

              <FaCaretDown
                size={12}
                className={`transition-transform duration-200 ${
                  openMenu === "more" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openMenu === "more" && (
              <div
                className="
                  absolute
                  right-0
                  top-full
                  mt-2
                  bg-white
                  dark:bg-slate-800
                  text-gray-800
                  dark:text-gray-100
                  rounded
                  shadow-lg
                  w-52
                  z-50
                  border
                  border-gray-100
                  dark:border-slate-700
                  animate-[fadeIn_0.2s_ease-out]
                "
              >
                <span
                  className="
                    block
                    px-4
                    py-2
                    hover:bg-gray-50
                    dark:hover:bg-slate-700
                    text-sm
                    cursor-pointer
                    transition-colors
                    duration-150
                  "
                >
                  Notification Preferences
                </span>

                <span
                  className="
                    block
                    px-4
                    py-2
                    hover:bg-gray-50
                    dark:hover:bg-slate-700
                    text-sm
                    cursor-pointer
                    transition-colors
                    duration-150
                  "
                >
                  24x7 Customer Care
                </span>

                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={closeMenu}
                    className="
                      block
                      px-4
                      py-2
                      hover:bg-gray-50
                      dark:hover:bg-slate-700
                      text-sm
                      transition-colors
                      duration-150
                    "
                  >
                    Admin Panel
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* CART */}
          <Link
            to={user ? "/cart" : "/login"}
            onClick={closeMenu}
            className="
              flex
              items-center
              gap-2
              font-medium
              transition-all
              duration-200
              hover:text-flipblue
            "
          >
            <div className="relative">

              <FaShoppingCart
                size={19}
                className="transition-transform duration-200 hover:scale-110"
              />

              {user && totalQuantity > 0 && (
                <span
                  className="
                    absolute
                    -top-2
                    -right-2
                    bg-flipaccent
                    text-white
                    text-[10px]
                    rounded-full
                    w-4
                    h-4
                    flex
                    items-center
                    justify-center
                    animate-[fadeIn_0.2s_ease-out]
                  "
                >
                  {totalQuantity}
                </span>
              )}

            </div>

            Cart
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;