import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Router, Navigate } from "react-router-dom";
import AdminLogin from "./Admincomponents/AdminLogin";
import AdminHome from "./Admincomponents/AdminHome";
import axios from "axios";
import AdminPassword from "./Admincomponents/AdminPassword";
import Forgetpassword from "./Admincomponents/Forgetpassword";
import ResetpassLink from "./Admincomponents/ResetpassLink";
import CategoryAdd from "./Category/CategoryAdd";
import GetcategoryProduct from "./Category/GetcategoryProduct";

const App = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await axios.post("http://localhost:5000/api/tokencheck", {
            token,
          });
          if (res.data.sts === 0) {
            setIsLoggedIn(true);
          }
        } catch (error) {
          if (error.response?.data?.sts === 1) {
            localStorage.removeItem("token");
            localStorage.removeItem("adminname");
            localStorage.removeItem("adminid");
            navigate("/adminlogin");

            console.error(error);
            setIsLoggedIn(false);
          }
        }
      }
      setLoading(false);
    };

    checkLoggedInStatus();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route
          path="/adminlogin"
          element={isLoggedIn ? <Navigate to="/adminhome" /> : <AdminLogin />}
        />

        <Route
          path="/adminhome"
          element={isLoggedIn ? <AdminHome /> : <Navigate to="/adminlogin" />}
        />
        <Route
          path="/adminpassword"
          element={
            isLoggedIn ? <AdminPassword /> : <Navigate to="/adminlogin" />
          }
        />
        <Route
          path="/forgetpass"
          element={
            isLoggedIn ? <Forgetpassword /> : <Navigate to="/adminlogin" />
          }
        />
        <Route path="/adminpassreset/:resetToken" element={<ResetpassLink />} />
        <Route
          path="/categoryadd"
          element={isLoggedIn ? <CategoryAdd /> : <Navigate to="/adminlogin" />}
        />
        <Route
          path="/getcategory"
          element={
            isLoggedIn ? <GetcategoryProduct /> : <Navigate to="/adminlogin" />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
