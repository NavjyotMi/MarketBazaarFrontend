import React from "react";
import payments from "../assets/payments.png";
import { Facebook, Twitter, Instagram } from "lucide-react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "#121519" }} className="text-white">
      <div className="flex flex-col">
        <div
          style={{ borderColor: "gray" }}
          className="text-white px-6 sm:px-10 py-10 sm:py-20 w-full space-y-3 border-b"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* SUPPORT Section */}
            <div className="flex flex-col space-y-5">
              <h1>.SUPPORT</h1>
              <div className="text-gray-400 space-y-2">
                <a href="#" className="block hover:text-gray-200">
                  Unsubscribe
                </a>
                <a href="#" className="block hover:text-gray-200">
                  Reservation
                </a>
                <a href="#" className="block hover:text-gray-200">
                  Contact Us
                </a>
                <a href="#" className="block hover:text-gray-200">
                  Feedback
                </a>
                <a href="#" className="block hover:text-gray-200">
                  Help
                </a>
              </div>
            </div>

            {/* POLICIES Section */}
            <div className="flex flex-col space-y-5">
              <h1>.POLICIES</h1>
              <div className="text-gray-400 space-y-2">
                <a href="#" className="block hover:text-gray-200">
                  Gift card conditions
                </a>
                <a href="#" className="block hover:text-gray-200">
                  Privacy Policy
                </a>
                <a href="#" className="block hover:text-gray-200">
                  Terms of use
                </a>
                <a href="#" className="block hover:text-gray-200">
                  Shipping
                </a>
                <a href="#" className="block hover:text-gray-200">
                  Return
                </a>
              </div>
            </div>

            <div className="flex flex-col space-y-5">
              <h1>.POLICIES</h1>
              <div className="text-gray-400 space-y-2">
                <a href="#" className="block hover:text-gray-200">
                  Gift card conditions
                </a>
                <a href="#" className="block hover:text-gray-200">
                  Privacy Policy
                </a>
                <a href="#" className="block hover:text-gray-200">
                  Terms of use
                </a>
                <a href="#" className="block hover:text-gray-200">
                  Shipping
                </a>
                <a href="#" className="block hover:text-gray-200">
                  Return
                </a>
              </div>
            </div>

            {/* MARKETBAZAAR Section */}
            <div className="flex flex-col space-y-5">
              <h1>.MARKETBAZAAR</h1>
              <div className="text-gray-400 space-y-2">
                <div style={{ color: "#999999" }}>
                  301 The Greenhouse London,
                </div>
                <div style={{ color: "#999999" }}>E2 8DY UK</div>
                <a href="#" className="block hover:text-gray-200">
                  support@domain.com
                </a>
                <a href="#" className="block hover:text-gray-200">
                  987988789
                </a>
                <div className="flex gap-3 mt-2">
                  <Facebook
                    strokeWidth={1}
                    className="cursor-pointer hover:text-gray-200"
                  />
                  <Twitter
                    strokeWidth={1}
                    className="cursor-pointer hover:text-gray-200"
                  />
                  <Instagram
                    strokeWidth={1}
                    className="cursor-pointer hover:text-gray-200"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Section - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center px-6 sm:px-10 py-5 gap-4 sm:gap-0">
          <div className="text-center sm:text-left text-gray-500">
            ©2024 copyright by whoever wants
          </div>
          <div className="flex justify-center sm:justify-end">
            <img
              src={payments}
              alt="Payment Methods"
              className="max-w-[150px]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
