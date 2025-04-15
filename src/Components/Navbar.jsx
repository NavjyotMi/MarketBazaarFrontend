import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../Redux/features/users/UserSlice";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const user = useSelector((state) => state.user.id);
  const role = useSelector((state) => state.user.role);
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function searchChangeHandler(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }
  function buttonClickHandler() {
    if (search.length != 0) navigate(`/search/?search=${search}`);
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function logoutHandler() {
    console.log("this is clicked");
    localStorage.removeItem("token");
    const clearUser = { id: "", fname: "", lname: "", role: "" };
    dispatch(setUser(clearUser));
  }

  return (
    <nav
      className={`w-full transition-all duration-100 border border-gray-300 z-50  fixed top-0 left-0 ${
        isScrolled
          ? "fixed top-0 left-0 bg-white shadow-md"
          : "relative bg-transparent"
      }`}
    >
      <div className="p-2 sm:px-6 lg:px-8 h-[5rem]">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold  text-gray-800">
            <span>MarketBazaar</span>
          </div>

          <div className="flex flex-column justify-between rounded-md bg-gray-200">
            <div className="hidden sm:flex items-center relative max-[500px]:hidden">
              <input
                type="text"
                placeholder="What are you looking for"
                onChange={searchChangeHandler}
                className="w-full px-3 py-1 text-black focus:outline-none"
              />
              <button
                className=" text-black px-4 py-1 rounded-r-full cursor-pointer"
                onClick={buttonClickHandler}
              >
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="hidden md:flex space-x-4 gap-4 items-center tracking-wide">
            <Link
              to="/"
              className="relative group text-gray-700 hover:text-gray-900 cursor-pointer"
            >
              Home
              <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-900 transform scale-x-0 origin-left transition-all duration-300 group-hover:scale-x-100"></span>
            </Link>
            {user && (
              <Link
                to="/cart"
                className="relative group text-gray-700 hover:text-gray-900"
              >
                Cart
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-900 transform scale-x-0 origin-left transition-all duration-300 group-hover:scale-x-100"></span>
              </Link>
            )}
            {user && (
              <Link
                to="/order"
                className=" relative group  text-gray-700 hover:text-gray-900"
              >
                Orders
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-900 transform scale-x-0 origin-left transition-all duration-300 group-hover:scale-x-100"></span>
              </Link>
            )}

            {user && (
              <Link
                to="/aboutme"
                className=" relative group text-gray-700 hover:text-gray-900"
              >
                About Me
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-900 transform scale-x-0 origin-left transition-all duration-300 group-hover:scale-x-100"></span>
              </Link>
            )}
            {role == "admin" && (
              <Link
                to="/vendor"
                className="relative group text-gray-700 hover:text-gray-900"
              >
                Vendors
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-900 transform scale-x-0 origin-left transition-all duration-300 group-hover:scale-x-100"></span>
              </Link>
            )}
            {!user && (
              <Link to="/login" className="relative group text-gray-700">
                Login
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-900 transform scale-x-0 origin-left transition-all duration-300 group-hover:scale-x-100"></span>
              </Link>
            )}
            {user && (
              <Link
                to="/"
                onClick={logoutHandler}
                className="relative group  text-gray-700  "
              >
                Logout
                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-900 transform scale-x-0 origin-left transition-all duration-300 group-hover:scale-x-100"></span>
              </Link>
            )}
          </div>
          <button
            className="sm:hidden flex justify-center items-center text-gray-500 hover:text-gray-700"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <FaSearch />
          </button>
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isSearchOpen && (
        <div className="md:hidden flex flex-col items-center justify-center w-full px-4 py-2 bg-gray-200">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              onChange={searchChangeHandler}
              className="w-full px-3 py-1 text-black focus:outline-none"
            />
            <button
              onClick={buttonClickHandler}
              className="text-black px-4 py-1"
            >
              <FaSearch />
            </button>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            to="/"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          {user && (
            <Link
              to="/aboutme"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              About Me
            </Link>
          )}
          {user && (
            <Link
              to="/cart"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Cart
            </Link>
          )}
          {user && (
            <Link
              to="/order"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Orders
            </Link>
          )}
          {role === "admin" && (
            <Link
              to="/vendor"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Vendor
            </Link>
          )}
          {!user && (
            <Link
              to="/login"
              className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
          {user && (
            <Link
              to="/"
              className="block px-4 py-2 text-blue-600 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              Logout
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
