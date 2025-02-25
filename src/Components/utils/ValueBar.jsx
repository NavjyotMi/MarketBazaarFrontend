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
  if (isError) console.log(error);
  console.log(categoryData);

  const categoryDisplay = searchParams.get("search") || "";

  function clickHandler(e) {
    const { name, value } = e.target;
    console.log(value);
    let tempQuery = queryString || "";

    if (name === "min") {
      setMinValue(value);
      tempQuery = tempQuery.replace(/&minvalue=\d*/, "") + `&minvalue=${value}`;
    } else if (name === "max") {
      setMaxValue(value);
      tempQuery = tempQuery.replace(/&maxvalue=\d*/, "") + `&maxvalue=${value}`;
    } else if (name === "category") {
      if (value === "all") {
        tempQuery = tempQuery.replace(/&category=[^&]*/, "");
        navigate(`?${tempQuery}`, { replace: true });
        setMaxValue(0);
        setMinValue(0);
        setCategory("");
        setSort(1);
        // If "All Categories" is selected, remove the category from the query string
        return;
      }
      console.log("this is being called");
      setCategory(value);
      tempQuery =
        tempQuery.replace(/&category=[^&]*/, "") + `&category=${value}`;
    } else if (name === "sort") {
      setSort(value); // This schedules a state update but doesn't change `sort` immediately
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
      {/* for category it will be drop down */}
      <div className="p-4 bg-white rounded-2xl mb-6 flex flex-row space-x-8 items-center border-t border-b border-black">
        {/* Category Filter */}
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

        {/* Price Range Filter */}
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
            <option value="dec">Price High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default ValueBar;
