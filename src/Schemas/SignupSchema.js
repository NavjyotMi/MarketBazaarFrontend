// src/ValidationSchemas/signupSchema.js
import * as Yup from "yup";

export const signupSchema = Yup.object().shape({
  fname: Yup.string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters"),
  lname: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required").email("Email is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmpassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  gender: Yup.string().required("Gender is required"),
});
