import React, { useEffect, useState } from "react";
import {
  useGetAllUserInfoQuery,
  useUpdateUserInfoMutation,
} from "../../Redux/features/users/UserApi";
function Aboutme() {
  const [Edit, setEdit] = useState(false);
  const [buttonClicked, setButtonClicked] = useState("");
  const [value, setValue] = useState({
    fname: "",
    lname: "",
    email: "",
  });
  const [userAddress, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });
  const { data, isLoading, isError, error, refetch } = useGetAllUserInfoQuery(
    localStorage.getItem("token")
  );
  console.log(data);
  const [updateUserInfo] = useUpdateUserInfoMutation();

  useEffect(() => {
    if (data) {
      const newObj = {
        fname: data?.user?.fname || "",
        lname: data?.user?.lname || "",
        email: data?.user?.email || "",
      };
      if (data.user.address) {
        const newadd = {
          street: data.user.address.street,
          city: data.user.address.city,
          state: data.user.address.state,
          zipCode: data.user.address.zipCode,
          country: data.user.address.country,
        };
        console.log(newadd);
        setAddress(newadd);
      }
      setValue(newObj);
    }
  }, [data]);

  function ChangeHandler(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setValue((prev) => ({ ...prev, [name]: value }));
  }

  function addChangeHandler(e) {
    const { name, value } = e.target;
    console.log(name, value);
    setAddress((prev) => ({ ...prev, [name]: value }));
  }

  function editButtonHandler(e) {
    const buttonClicked = e.target.name;
    setButtonClicked(e.target.name);

    if (buttonClicked === "name") {
      const obj = {
        fname: data.user.fname,
        lname: data.user.lname,
      };

      setValue(obj);
    }

    if (buttonClicked === "address") {
      const obj = { email: data.user.fname };
      setValue(obj);
    }

    setEdit(!Edit);
  }

  async function saveButtonHandler() {
    const token = localStorage.getItem("token");
    if (buttonClicked === "name") {
      if (value.fname.length === 0 || value.fname.length === 0) {
        console.log("fields cannot be empty");
      } else {
        setEdit(!Edit);
        await updateUserInfo({ id: token, credential: value });
        refetch();
      }
    }

    if (buttonClicked === "address") {
      console.log(userAddress);

      const finalAddress = { address: userAddress };
      updateUserInfo({ id: token, credential: finalAddress });
      refetch();
    }

    setEdit((prev) => !prev);
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 space-y-8">
        {data && (
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Personal Information
              </h2>
              <button
                name="name"
                onClick={editButtonHandler}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
              >
                Edit
              </button>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="fname"
                onChange={ChangeHandler}
                disabled={!(Edit && buttonClicked === "name")}
                value={value.fname}
                placeholder="First Name"
              />
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="lname"
                onChange={ChangeHandler}
                disabled={!(Edit && buttonClicked === "name")}
                value={value.lname}
                placeholder="Last Name"
              />
              {Edit && buttonClicked === "name" && (
                <button
                  className="w-full py-3 bg-blue-600 text-white rounded-lg text-sm font-medium mt-2 hover:bg-blue-700 transition"
                  onClick={saveButtonHandler}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        )}

        {/* Email Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Email Address</h2>
          <input
            type="text"
            name="email"
            className="w-full border border-gray-300 bg-gray-100 rounded-md p-3 text-sm text-gray-500 cursor-not-allowed"
            disabled
            value={value.email}
          />
        </div>

        {/* Address Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Address</h2>
            <button
              name="address"
              onClick={editButtonHandler}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
            >
              Edit
            </button>
          </div>

          {!Edit && data?.user?.address && (
            <div className="text-sm space-y-2 text-gray-600 bg-gray-50 p-4 rounded-md">
              <div>
                <strong>Street:</strong> {userAddress.street}
              </div>
              <div>
                <strong>City:</strong> {userAddress.city}
              </div>
              <div>
                <strong>State:</strong> {userAddress.state}
              </div>
              <div>
                <strong>Zipcode:</strong> {userAddress.zipCode}
              </div>
              <div>
                <strong>Country:</strong> {userAddress.country}
              </div>
            </div>
          )}

          {Edit && buttonClicked === "address" && (
            <div className="space-y-3">
              {["street", "city", "state", "zipCode", "country"].map(
                (field, key) => (
                  <input
                    key={key}
                    name={field}
                    type={field === "zipCode" ? "number" : "text"}
                    className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    onChange={addChangeHandler}
                    value={userAddress[field]}
                  />
                )
              )}
              <button
                className="w-full py-3 bg-blue-600 text-white rounded-lg text-sm font-medium mt-2 hover:bg-blue-700 transition"
                onClick={saveButtonHandler}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Aboutme;
