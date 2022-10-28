import React from "react";
import { Route, Routes } from "react-router-dom";
import Registrering from "../component/Registrering";
import LandingPage from "../component/LandingPage";
import Home from "../component/Home";
import Profile from "../component/Profile";
import Contact from "../component/Contact";
import Developers from "../component/Developers";
import PostDetail from "../component/PostDetail";
import FormProduct from "../component/FormProducts";
import Order from "../component/Order";
import ViewProductSeller from "../component/ViewProductsSeller";
import MyShopping from "../component/MyShopping";
import StoreSeller from "../component/StoreSeller/index";
import OderDetail from "../component/OrderDetail/orderDetail";
import ViewOrderSeller from "../component/ViewOrderSeller"
import AdminListSeller from "../component/AdminListSeller/index";

import OrderDelivered from "../component/OrderDelivered/orderDelivered";

import Dashboard from "../component/Dashboard/Dashboard";



function RouteController() {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/register" element={<Registrering />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/developers" element={<Developers />} />
      <Route path="/home/:postId" element={<PostDetail />} />
      <Route path="/formproduct" element={<FormProduct />} />
      <Route path="/customer/orders" element={<Order />}/>
      <Route exact path="/viewproductseller" element={<ViewProductSeller />} />
      <Route path="/myShopping" element={<MyShopping />} />
      <Route path="/postSeller" element={<StoreSeller />} />
      <Route path="/orderDetial/:id" element={<OderDetail/>} />
      <Route exact path="/ViewOrderSeller" element={<ViewOrderSeller />} />
      <Route path="/listSeller" element={<AdminListSeller />} />

      <Route path="/orderDelivered/:id" element={<OrderDelivered/>} />

      <Route path="/dashboard" element={<Dashboard/>} />

    </Routes>
  );
}

export { RouteController };
