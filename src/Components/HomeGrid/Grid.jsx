import React from "react";
import electronics from "../../assets/electronic.png";
import clothes from "../../assets/clothes.png";
import homedecor from "../../assets/homedecor.png";
import beauty from "../..//assets/beauty.png";
import Stationary from "../../assets/Stationary.png";
import { Link } from "react-router-dom";

const Grid = () => {
  return (
    <div className="grid sm:grid-cols-12 sm:grid-rows-9 gap-[1rem] my-[2rem] px-10">
      <div className="bg-[#FEE9EC] row-span-5 col-span-6 flex justify-center items-center">
        <div className="group p-10 cursor-pointer text-center">
          <div className="overflow-hidden flex justify-center">
            <img
              src={electronics}
              className="w-full max-w-[250px] h-auto transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <Link
            to="/search/?category=electronics"
            className="text-[25px] font-thin cursor-pointer hover:text-[#6f42c1]"
          >
            Electronics And <br />
            Gadgets
          </Link>
        </div>
      </div>
      <div className="bg-[#DEEBFD] row-span-4 col-span-6 flex justify-center items-center">
        <div className="group p-10 cursor-pointer text-center">
          <div className="overflow-hidden flex justify-center">
            <img
              src={clothes}
              className="w-full max-w-[250px] h-auto transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <Link
            to="/search/?category=clothes"
            className="text-[25px] font-thin cursor-pointer hover:text-[#6f42c1]"
          >
            Fashion And <br />
            Apparel
          </Link>
        </div>
      </div>
      <div className="bg-[#FEECDE] row-span-5 col-span-3 flex justify-center items-center">
        <div className="group p-10 cursor-pointer text-center">
          <div className="overflow-hidden flex justify-center">
            <img
              src={beauty}
              className="w-full max-w-[200px] h-auto transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <Link
            to="/search/?category=beauty"
            className="text-[25px] font-thin cursor-pointer hover:text-[#6f42c1]"
          >
            Beauty And <br />
            Glow
          </Link>
        </div>
      </div>
      <div className="bg-[#E7F8FF] row-span-5 col-span-3 flex justify-center items-center">
        <div className="group p-10 cursor-pointer text-center">
          <div className="overflow-hidden flex justify-center">
            <img
              src={Stationary}
              className="w-full max-w-[200px] h-auto transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <Link
            to="/search/?category=books"
            className="text-[25px] font-thin cursor-pointer hover:text-[#6f42c1]"
          >
            Books And <br />
            Stationary
          </Link>
        </div>
      </div>
      <div className="bg-[#F3EFEA] row-span-4 col-span-6 flex justify-center items-center">
        <div className="group p-10 cursor-pointer text-center">
          <div className="overflow-hidden flex justify-center">
            <img
              src={homedecor}
              className="w-full max-w-[250px] h-auto transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <Link
            to="/search/?category=home"
            className="text-[25px] font-thin cursor-pointer hover:text-[#6f42c1]"
          >
            Home And <br />
            Living
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Grid;
