import React from "react";
import dollar from "../assets/money.png";
import truck from "../assets/truck.png";
import support from "../assets/support.png";
const Description = () => {
  return (
    <>
      <style>
        {`
      @keyframes swingFast {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(30deg); }
        50% { transform: rotate(-30deg); }
        75% { transform: rotate(15deg); }
      }
    `}
      </style>
      <div className="flex flex-col sm:flex-row justify-between gap-6 px-6 sm:px-10 py-10 sm:py-20">
        <div className="p-5 group">
          <div className="flex justify-center">
            <img
              src={truck}
              alt=""
              className="transition-transform duration-100 group-hover:animate-[swingFast_0.3s_ease-in-out]"
            />
          </div>
          <div className="text-center text-[#494949] text-lg m-3">
            Free Delivery
          </div>
          <div className="text-center text-[#6a6a6a] text-sm">
            Lorem ipsum dolor sit amet consectetu adipisicing elit sed
          </div>
        </div>

        {/* Divider - Hidden on mobile */}
        <div className="hidden sm:block w-px bg-gray-500"></div>

        <div className="p-5 group">
          <div className="flex justify-center">
            <img
              src={support}
              alt=""
              className="transition-transform duration-100 group-hover:animate-[swingFast_0.3s_ease-in-out]"
            />
          </div>
          <div className="text-center text-[#494949] text-lg m-3">
            24/7 Service
          </div>
          <div className="text-center text-[#6a6a6a] text-sm">
            Lorem ipsum dolor sit amet consectetu adipisicing elit sed
          </div>
        </div>

        {/* Divider - Hidden on mobile */}
        <div className="hidden sm:block w-px bg-gray-500"></div>

        <div className="p-5 group">
          <div className="flex justify-center">
            <img
              src={dollar}
              alt=""
              className="transition-transform duration-100 group-hover:animate-[swingFast_0.3s_ease-in-out]"
            />
          </div>
          <div className="text-center text-[#494949] text-lg m-3">
            Guarantee Money Back
          </div>
          <div className="text-center text-[#6a6a6a] text-sm">
            Lorem ipsum dolor sit amet consectetu adipisicing elit sed
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
