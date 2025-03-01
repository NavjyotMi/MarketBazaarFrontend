import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetCategoryQuery } from "../../Redux/features/products/ProductApi";
useGetCategoryQuery;
function ValueBar() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [sort, setSort] = useState("inc");
  const [queryString, setQueryString] = useState("");
  const [category, setCategory] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data: categoryData, isError, error } = useGetCategoryQuery();
  if (categoryData) console.log(categoryData);
  const categoryDisplay = searchParams.get("search") || "";

  function clickHandler(e) {
    const { name, value } = e.target;
    let tempQuery = queryString || "";

    if (name === "min") {
      setMinValue(value);
      tempQuery = tempQuery.replace(/&minvalue=\d*/, "") + `&minvalue=${value}`;
    } else if (name === "max") {
      setMaxValue(value);
      tempQuery = tempQuery.replace(/&maxvalue=\d*/, "") + `&maxvalue=${value}`;
    } else if (name === "category") {
      if (value === "all") {
        setMaxValue(0);
        setMinValue(0);
        setCategory("");
        setSort(1);
        tempQuery = tempQuery.replace(/&category=[^&]*/, "");
        setQueryString("");
        navigate("/");
        return;
      }
      console.log("this is being called");
      setCategory(value);
      tempQuery =
        tempQuery.replace(/&category=[^&]*/, "") + `&category=${value}`;
    } else if (name === "sort") {
      console.log(category);
      setSort(value);
      tempQuery = tempQuery.replace(/(&sort=[^&]*)/, "") + `&sort=${value}`;
    }

    tempQuery = tempQuery.replace(/(&?search=[^&]*)/, "");
    if (categoryDisplay !== "") {
      tempQuery = `search=${searchParams.get("search")}` + tempQuery;
    }

    navigate(`?${tempQuery}`, { replace: true });
    setQueryString(tempQuery);
    console.log(tempQuery);
  }

  return (
    <div>
      <div className="p-4 bg-white rounded-2xl mb-6 flex flex-row space-x-8 items-center border-t border-b border-black">
        {categoryDisplay === "" && (
          <div className="flex flex-col">
            <label htmlFor="category" className="text-lg font-semibold mb-1">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={clickHandler}
            >
              <option value="all">All Categories</option>
              {categoryData?.category?.map((ele, key) => (
                <option key={key} value={ele}>
                  {ele}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col">
          <label className="text-lg font-semibold mb-1">Price Range</label>
          <div className="flex flex-row items-center space-x-4">
            <div className="text-sm text-gray-600">Min:</div>
            <input
              type="number"
              name="min"
              onChange={clickHandler}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  clickHandler(e);
                }
              }}
              value={minValue}
            />
            <div className="text-sm text-gray-600">Max:</div>
            <input
              type="number"
              name="max"
              value={maxValue}
              onChange={clickHandler}
            />
          </div>
        </div>

        {/* Sort Filter */}
        <div className="flex flex-col">
          <label htmlFor="sort" className="text-lg font-semibold mb-1">
            Sort By
          </label>
          <select
            name="sort"
            id="sort"
            onChange={clickHandler}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select</option>
            <option value="inc">Price Low to High</option>
            <option value="desc">Price High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// // export default ValueBar;
// import React, { useState, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { useGetCategoryQuery } from "../../Redux/features/products/ProductApi";

// function ValueBar() {
//   const [filters, setFilters] = useState({
//     minValue: 0,
//     maxValue: 0,
//     sort: "inc",
//     category: "",
//   });
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const { data: categoryData, isError, error } = useGetCategoryQuery();
//   const categoryDisplay = searchParams.get("search") || "";

//   // Helper function to update query string and navigate
//   const updateQueryString = (updatedFilters) => {
//     const query = Object.entries(updatedFilters)
//       .filter(([key, value]) => value)
//       .map(([key, value]) => `${key}=${value}`)
//       .join("&");

//     navigate(`?${query}`, { replace: true });
//   };

//   // Generalized change handler
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters((prevFilters) => {
//       const updatedFilters = {
//         ...prevFilters,
//         [name]: value,
//       };

//       // Special handling for category selection
//       if (name === "category" && value === "all") {
//         updatedFilters.category = "";
//         updatedFilters.minValue = 0;
//         updatedFilters.maxValue = 0;
//         updatedFilters.sort = "inc";
//       }

//       updateQueryString(updatedFilters);
//       return updatedFilters;
//     });
//   };

//   // Effect to keep URL in sync with state
//   useEffect(() => {
//     updateQueryString(filters);
//   }, [filters]);

//   return (
//     <div>
//       <div className="p-4 bg-white rounded-2xl mb-6 flex flex-row space-x-8 items-center border-t border-b border-black">
//         {/* Category Filter */}
//         {categoryDisplay === "" && (
//           <div className="flex flex-col">
//             <label htmlFor="category" className="text-lg font-semibold mb-1">
//               Category
//             </label>
//             <select
//               name="category"
//               id="category"
//               className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               onChange={handleChange}
//               value={filters.category}
//             >
//               <option value="all">All Categories</option>
//               {categoryData?.category?.map((ele, key) => (
//                 <option key={key} value={ele}>
//                   {ele}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Price Range Filter */}
//         <div className="flex flex-col">
//           <label className="text-lg font-semibold mb-1">Price Range</label>
//           <div className="flex flex-row items-center space-x-4">
//             <div className="text-sm text-gray-600">Min:</div>
//             <input
//               type="number"
//               name="minValue"
//               onChange={handleChange}
//               value={filters.minValue}
//             />
//             <div className="text-sm text-gray-600">Max:</div>
//             <input
//               type="number"
//               name="maxValue"
//               value={filters.maxValue}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         {/* Sort Filter */}
//         <div className="flex flex-col">
//           <label htmlFor="sort" className="text-lg font-semibold mb-1">
//             Sort By
//           </label>
//           <select
//             name="sort"
//             id="sort"
//             onChange={handleChange}
//             value={filters.sort}
//             className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="inc">Price Low to High</option>
//             <option value="desc">Price High to Low</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

export default ValueBar;
