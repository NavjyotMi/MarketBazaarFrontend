import { useState } from "react";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
import Layout from "./Components/utils/Layout";
import ProductInfo from "./Components/Products/ProductInfo";
import SearchProduct from "./Components/Products/SearchProduct";
import Aboutme from "./Components/User/Aboutme";
import Cart from "./Components/Cart/Cart";

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
          <Route path="/aboutme" element={<Aboutme />} />
          <Route path="/cart/:id" element={<Cart />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
