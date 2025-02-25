import { useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";
import Navbar from "./Components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Layout from "./Components/utils/Layout";
import ProductInfo from "./Components/Products/ProductInfo";
import SearchProduct from "./Components/Products/SearchProduct";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Layout />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/product/:id" element={<ProductInfo />}></Route>
          <Route path="/search" element={<SearchProduct />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
