import React, { useState, useEffect } from "react";
import {
  useSignupUserMutation,
  useGetUserInfoQuery,
} from "../../Redux/features/users/UserApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { signupSchema } from "../../Schemas/SignupSchema";
import { setUser } from "../../Redux/features/users/UserSlice";
import WrapperAuth from "./WrapperAuth";
import "./Signup.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formdata, setFormdata] = useState({
    fname: "",
    lname: "",
    password: "",
    confirmpassword: "",
    email: "",
    gender: "",
  });
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signupUserResponse = useSignupUserMutation();
  const signupUser = signupUserResponse[0];
  const { data: userInfo } = useGetUserInfoQuery(token, {
    skip: !token,
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      const userobj = {
        id: userInfo.user._id,
        fname: userInfo.user.fname,
        lname: userInfo.user.lname,
        role: userInfo.user.role,
      };
      dispatch(setUser(userobj));
      navigate("/");
    }
  }, [userInfo, dispatch]);

  // const { isLoading, error, data } = signupUserResponse[1];

  // Formchanges update
  async function formChangeHandler(e) {
    const { name, value } = e.target;

    setFormdata((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  // form submit handler
  async function submitHandler(e) {
    e.preventDefault();
    console.log(formdata);
    const finalObj = {
      fname: formdata.fname,
      lname: formdata.lname,
      email: formdata.email,
      gender: formdata.gender,
    };

    if (formdata.password === formdata.confirmpassword) {
      finalObj.password = formdata.password;
      try {
        await signupSchema.validate(formdata, { abortEarly: false });
        setErrors({});
        const returneddata = await signupUser(finalObj).unwrap();
        console.log(returneddata);
        setFormdata(() => ({
          gender: "",
          fname: "",
          lname: "",
          password: "",
          confirmpassword: "",
          email: "",
        }));
        localStorage.setItem("token", returneddata.token);
        setToken(returneddata.token);
      } catch (error) {
        if (error.data) {
          toast.error(error.data.message);
        }

        console.log(error);
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      }
    } else {
      toast.error("password and confirm password are not same");
    }
  }

  return (
    <>
      <WrapperAuth>
        <div className="WrapperAuth">
          <div className="innerclass">
            <h1 className="logo">.MARKETBAZAAR</h1>
            <h3>Hope you Enjoy!!!</h3>

            <h1>Sign Up</h1>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                name="fname"
                placeholder="Enter your first name"
                value={formdata.fname}
                onChange={formChangeHandler}
              />
              {errors.fname && <p className="error">{errors.fname}</p>}
              <input
                type="text"
                name="lname"
                placeholder="Enter your last name"
                value={formdata.lname}
                onChange={formChangeHandler}
              />
              {errors.lname && <p className="error">{errors.lname}</p>}
              <input
                type="text"
                name="email"
                placeholder="Enter your email name"
                value={formdata.email}
                onChange={formChangeHandler}
              />
              {errors.email && <p className="error">{errors.email}</p>}
              <input
                type="password"
                name="password"
                placeholder="Enter password name"
                value={formdata.password}
                onChange={formChangeHandler}
              />
              {errors.password && <p className="error">{errors.password}</p>}
              <input
                name="confirmpassword"
                type="password"
                placeholder="Enter confirm password name"
                value={formdata.confirmpassword}
                onChange={formChangeHandler}
              />
              {errors.password && <p className="error">{errors.password}</p>}
              <div className="genderSection">
                <h4>Gender:</h4>
                <label className="radioContainer">
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formdata.gender === "male"}
                    onChange={formChangeHandler}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="radioContainer">
                  Female
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formdata.gender === "female"}
                    onChange={formChangeHandler}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <button type="submit">Sign up</button>
            </form>
          </div>
        </div>
      </WrapperAuth>
    </>
  );
};

export default Signup;
