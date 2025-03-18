import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { setUser } from "./Redux/features/users/UserSlice";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useGetUserInfoQuery } from "./Redux/features/users/UserApi";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart/Cart";
import Aboutme from "./Components/User/Aboutme";
import Skeleton from "./Components/utils/Skeleton";
import DashBoard from "./Components/admin/DashBoard";
import Login from "./Components/Authentication/Login";
import AllProduct from "./Components/admin/AllProduct";
import VendorHome from "./Components/admin/VendorHome";
import Signup from "./Components/Authentication/Signup";
import SeeAllOrders from "./Components/admin/SeeAllOrders";
import ProductInfo from "./Components/Products/ProductInfo";
import SingleProduct from "./Components/admin/SingleProduct";
import CreateProduct from "./Components/admin/CreateProduct";
import SearchProduct from "./Components/Products/SearchProduct";

function App() {
  const Token = localStorage.getItem("token");
  const dispatch = useDispatch();

  const { data } = useGetUserInfoQuery(Token, { skip: !Token });

  useEffect(() => {
    if (data) {
      const obj = {
        id: data.user._id,
        fname: data.user.fname,
        lname: data.user.lname,
        role: data.user.role,
      };
      dispatch(setUser(obj));
    }
  }, [data]);

  return (
    <>
      <ToastContainer />
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Navbar />
        <Suspense fallback={<Skeleton />}></Suspense>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/product/:id" element={<ProductInfo />}></Route>
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/aboutme" element={<Aboutme />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/vendor" element={<VendorHome />}>
            <Route path="createproduct" element={<CreateProduct />} />
            <Route path="products" element={<AllProduct />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="productinfo" element={<SingleProduct />} />
            <Route path="order" element={<SeeAllOrders />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
