import React, { useEffect, useState } from "react";
import {
  useGetAllUserInfoQuery,
  useGetUserInfoQuery,
} from "../../Redux/features/users/UserApi";
import { useRoutes } from "react-router-dom";
// things i need to to
// step--> get the jwt from the localstorage and then send the request to the backend ✅
// step--2 display all the data ✅
// step 3 with each data add a button which will edit the data if the user wants to edit
// problem in this step
// step 4 have a save button at the bottom which will update the about me then refetch the data and the display again

// so i am not getting address phone number dob
function Aboutme() {
  const [Edit, setEdit] = useState(false);
  const [receivedData, setReceivedData] = useState("");
  const [EditedData, setEditedData] = useState("");
  const [buttonClicked, setButtonClicked] = useState("");
  const [value, setValue] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    address: "",
  });
  const { data, isLoading, isError, error } = useGetAllUserInfoQuery(
    localStorage.getItem("token")
  );

  // if (data) {
  //   setReceivedData(data);
  //   console.log(data);
  // }

  useEffect(() => {
    if (data) {
      const newObj = {
        fname: data?.user?.fname || "",
        lname: data?.user?.lname || "",
        email: data?.user?.email || "",
        phone: data?.user?.phone || "",
        address: data.user?.address || "",
      };
      setValue(newObj);
    }
  }, [data]);

  function ChangeHandler(e) {
    const { name, value } = e.target;
    console.log(name, value);

    setValue((prev) => ({ ...prev, [name]: value }));
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
    if (buttonClicked === "email") {
      const obj = { email: data.user.fname };
      setValue(obj);
    }
    setEdit(!Edit);
  }

  function saveButtonHandler() {
    if (value.fname.length === 0 || value.fname.length === 0) {
      console.log("fields cannot be empty");
    }
    console.log(value);
  }
  return (
    <div>
      {data && (
        <div>
          <div>
            <div>
              <div>Personal Information</div>
              <button
                name="name"
                onClick={editButtonHandler}
                className="cursor-pointer"
              >
                Edit
              </button>
              <div>
                <input
                  type="text"
                  className="border-2 border-gray-500"
                  name="fname"
                  onChange={ChangeHandler}
                  disabled={!(Edit && buttonClicked === "name")}
                  value={value.fname}
                />
                <input
                  type="text"
                  onChange={ChangeHandler}
                  name="lname"
                  disabled={!(Edit && buttonClicked === "name")}
                  value={value.lname}
                />
                {Edit && buttonClicked === "name" && (
                  <input
                    type="button"
                    value="Save"
                    onClick={saveButtonHandler}
                  />
                )}
              </div>
            </div>
          </div>
          <div>
            <div>Email Address</div>
            <button name="email" onClick={editButtonHandler}>
              Edit
            </button>
            <div>
              <input
                type="text"
                name="email"
                disabled={!(Edit && buttonClicked === "email")}
                onChange={ChangeHandler}
                value={value.email}
              />
              {Edit && buttonClicked === "email" && (
                <input type="button" value="Save" onClick={saveButtonHandler} />
              )}
            </div>
            {/* <div>{data.user.email}</div> */}
          </div>
          <div>
            <div>Your Gender:</div>
            <div>{data.user.gender}</div>
          </div>
          <div>
            <div>Address:</div>
            {data.user.address && <div>{data.user.address}</div>}
          </div>
          <div>
            <div>Mobile Number:</div>
            {data.user.phone && <div>{data.user.phone}</div>}
          </div>
        </div>
      )}
      {/* <div>As of now nothing is in here</div> */}
    </div>
  );
}

export default Aboutme;
