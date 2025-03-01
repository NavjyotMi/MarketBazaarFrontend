import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <div className="w-1/5 min-h-screen bg-gray-800 text-white p-6 space-y-6">
      <h2 className="text-3xl font-bold mb-6">Vendor Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="order"
            className="block py-3 px-5 rounded hover:bg-gray-700 transition duration-300"
          >
            All Orders
          </Link>
        </li>
        <li>
          <Link
            to="products"
            className="block py-3 px-5 rounded hover:bg-gray-700 transition duration-300"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="createproduct"
            className="block py-3 px-5 rounded hover:bg-gray-700 transition duration-300"
          >
            Create Product
          </Link>
        </li>
        <li>
          <Link
            to="dashboard"
            className="block py-3 px-5 rounded hover:bg-gray-700 transition duration-300"
          >
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
    // </div>
  );
}

export default SideBar;
