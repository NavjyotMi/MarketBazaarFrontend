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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-6 space-y-6">
        {data && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-700">
                Personal Information
              </h2>
              <button
                name="name"
                onClick={editButtonHandler}
                className="text-blue-500 hover:text-blue-700 text-sm"
              >
                Edit
              </button>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                className="w-full border rounded-md p-2 text-sm"
                name="fname"
                onChange={ChangeHandler}
                disabled={!(Edit && buttonClicked === "name")}
                value={value.fname}
                placeholder="First Name"
              />
              <input
                type="text"
                className="w-full border rounded-md p-2 text-sm"
                name="lname"
                onChange={ChangeHandler}
                disabled={!(Edit && buttonClicked === "name")}
                value={value.lname}
                placeholder="Last Name"
              />
              {Edit && buttonClicked === "name" && (
                <button
                  className="w-full py-2 bg-blue-500 text-white rounded-md text-sm mt-2 hover:bg-blue-600 transition"
                  onClick={saveButtonHandler}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        )}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">Email Address</h2>
          <input
            type="text"
            name="email"
            className="w-full border rounded-md p-2 text-sm"
            disabled
            value={value.email}
          />
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-700">Address</h2>
            <button
              name="address"
              onClick={editButtonHandler}
              className="text-blue-500 hover:text-blue-700 text-sm"
            >
              Edit
            </button>
          </div>
          {!Edit && data?.user?.address && (
            <div className="text-sm space-y-1 text-gray-600">
              <div>Street: {userAddress.street}</div>
              <div>City: {userAddress.city}</div>
              <div>State: {userAddress.state}</div>
              <div>Zipcode: {userAddress.zipCode}</div>
              <div>Country: {userAddress.country}</div>
            </div>
          )}
          {Edit && buttonClicked === "address" && (
            <div className="space-y-2">
              {["street", "city", "state", "zipCode", "country"].map(
                (field, key) => (
                  <input
                    key={key}
                    name={field}
                    type={field === "zipCode" ? "number" : "text"}
                    className="w-full border rounded-md p-2 text-sm"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    onChange={addChangeHandler}
                    value={userAddress[field]}
                  />
                )
              )}
              <button
                className="w-full py-2 bg-blue-500 text-white rounded-md text-sm mt-2 hover:bg-blue-600 transition"
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
