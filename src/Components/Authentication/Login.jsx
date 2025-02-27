import React, { useEffect, useState } from "react";
import WrapperAuth from "./WrapperAuth";
import {
  useLoginUserMutation,
  useGetUserInfoQuery,
} from "../../Redux/features/users/UserApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/features/users/UserSlice";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const [loginUser, { isError, isLoading, isSuccess }] = useLoginUserMutation();
  const { data: userInfo } = useGetUserInfoQuery(token, { skip: !token });
  function formHandler(e) {
    const { name, value } = e.target;
    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  // useEffect for make the fetching
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      // console.log(userInfo);
      const userObj = {
        id: userInfo.user._id,
        fname: userInfo.user.fname,
        lname: userInfo.user.lname,
        role: userInfo.user.role,
      };
      dispatch(setUser(userObj));
      navigate("/");
    }
  }, [userInfo]);

  // async function to make rtk query
  async function submitHandler(e) {
    e.preventDefault();
    try {
      setFormdata(() => ({ email: "", password: "" }));
      const loginObj = {
        email: formData.email,
        password: formData.password,
      };
      const recievedData = await loginUser(loginObj).unwrap();
      // console.log(recievedData);
      localStorage.setItem("token", recievedData.token);
      setToken(recievedData.token);
    } catch (error) {
      if (error.data) toast.error(error.data.message);
      console.log(error);
    }
  }
  //
  return (
    <>
      <WrapperAuth>
        <div className="WrapperAuth">
          <h1>.LOGIN</h1>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Enter the email"
              name="email"
              onChange={formHandler}
              value={formData.email}
            />
            <input
              type="password"
              placeholder="Enter the password"
              onChange={formHandler}
              name="password"
              value={formData.password}
            />
            <button>.LOGIN</button>
          </form>
          <div className="text-center mt-4">
            <span className="text-gray-600">Not a user?</span>
            <Link
              to="/signup"
              className="text-blue-500 font-semibold hover:underline ml-1 transition duration-300"
            >
              Signup
            </Link>
          </div>
        </div>
      </WrapperAuth>
    </>
  );
};

export default Login;
