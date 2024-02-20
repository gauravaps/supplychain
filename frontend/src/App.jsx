import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate,  Navigate } from "react-router-dom";
import AdminLogin from "./Admincomponents/AdminLogin";
import AdminHome from "./Admincomponents/AdminHome";
import axios from "axios";
import AdminPassword from "./Admincomponents/AdminPassword";
import Forgetpassword from "./Admincomponents/Forgetpassword";
import ResetpassLink from "./Admincomponents/ResetpassLink";
import CategoryAdd from "./Category/CategoryAdd";
import GetcategoryProduct from "./Category/GetcategoryProduct";
import Addproduct from "./Category/Addproduct";

const App = () => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  

  const checkstatus=async()=>{
  const token = localStorage.getItem("token");

    try {
      const res = await axios.post("http://localhost:5000/api/tokencheck",{token:token});

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
                 // navigate("/adminlogin"); 
                

      
    }


  }
  setLoading(false)
}

  useEffect (()=>{
    checkstatus()
    
    

  },[navigate])


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
        <Route path="/getcategory" element={isLoggedIn ? <GetcategoryProduct /> : <Navigate to="/adminlogin"/>} />
        <Route element={<Navigate to="/adminlogin" />} />

        <Route path="/addproduct" element={isLoggedIn ? <Addproduct/> : < Navigate to="/adminlogin"/>} />
      


      </Routes>
      
    </div>
  );
      }

export default App;
