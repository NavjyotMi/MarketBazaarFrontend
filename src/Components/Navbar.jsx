import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const user = useSelector((state) => state.user.id);
  const role = useSelector((state) => state.user.role);
  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  function searchChangeHandler(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }
  function buttonClickHandler() {
    navigate(`/search/?search=${search}`);
  }
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
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

  return (
    <nav
      className={`w-full transition-all duration-300 ${
        isScrolled
          ? "fixed top-0 left-0 bg-[#121519] shadow-lg"
          : "relative bg-transparent mb-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold  text-gray-800">
            <span className="block md:hidden">.mb</span>
            <span className="hidden md:block">.MARKETBAZAAR</span>
          </div>
          <div className="hidden w-1/3 md:flex items-center w-1/2 relative">
            <input
              type="text"
              placeholder="Search..."
              onChange={searchChangeHandler}
              className="w-full px-3 py-1 rounded-l-full text-black border border-gray-300 focus:outline-none"
            />
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded-r-full cursor-pointer"
              onClick={buttonClickHandler}
            >
              🔍
            </button>
          </div>

          <button
            className="text-gray-500 hover:text-gray-700 md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            🔍
          </button>

          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to="/"
              className="text-gray-800 hover:text-blue-600 cursor-pointer"
            >
              Home
            </Link>
            {user && (
              <Link
                to="/cart"
                className="text-gray-800 hover:text-blue-600 cursor-pointer"
              >
                Cart
              </Link>
            )}
            {user && (
              <Link to="/order" className="text-gray-800 hover:text-blue-600">
                Orders
              </Link>
            )}

            {user && (
              <Link to="/aboutme" className="text-gray-800 hover:text-blue-600">
                About Me
              </Link>
            )}
            {role == "admin" && (
              <Link to="/vendor" className="text-gray-800 hover:text-blue-600">
                Vendors
              </Link>
            )}

            {!user && (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Login/Signup
              </Link>
            )}
            {user && (
              <Link
                to="/"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Logout
              </Link>
            )}
          </div>
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
        <div className="md:hidden bg-white shadow-md px-4 py-2">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              onChange={searchChangeHandler}
              className="w-full px-3 py-1 rounded-l-full text-black border border-gray-300 focus:outline-none"
            />
            <button
              onClick={buttonClickHandler}
              className="bg-blue-600 text-white px-4 py-1 rounded-r-full cursor-pointer"
            >
              🔍
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
