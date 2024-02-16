import React, { useState } from "react";
import axios from "axios";
import ToastShow from "../commonComponent/ToastShow";
import Navbar from "../commonComponent/Navbar";
import { Link } from "react-router-dom";
import GetcategoryProduct from "./GetcategoryProduct";

const CategoryAdd = () => {
    const [msg, setmsg] = useState("");
    const [errortype, seterrortype] = useState("");
    const [showToast, setshowToast] = useState(false);




  const [formData, setFormData] = useState({
    productname: "",
    productype: "",
    pictures: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, pictures: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("productname", formData.productname);
      formDataToSend.append("productype", formData.productype);
      formDataToSend.append("pictures", formData.pictures);

      const res = await axios.post(
        "http://localhost:5000/cat/addcategory",
        formDataToSend
      );
      if(res.data.sts===0){
        setshowToast(true);
        setmsg(res.data.message);
        seterrortype("success");
        setTimeout(() => {
          setshowToast(false);
        }, 3000);
      }

      console.log(res.data);
      // Clear form after successful submission if needed
      setFormData({
        productname: "",
        productype: "",
        pictures: null,
      });
    } catch (error) {
        if (error.response && error.response.data && error.response.data.sts) {

        setshowToast(true);
        setmsg(error.response.data.message);
        seterrortype("error");
        setTimeout(() => {
          setshowToast(false);
        }, 3000);
        }

      console.error("Product add failed:", error);
    }
  };



  
  

  return (

    
    <div className="container">
      <div><Navbar/></div>
      
    
      
      <div className="heading">
      
      
        <div className="login">
          
          <h2>
            <span>Add category product</span>
          </h2>
        </div>
        <ToastShow msg={msg} errortype={errortype} showToast={showToast} />
        

        
        <form className="formstart" onSubmit={handleSubmit}>
          <div className="labelstart">
            <label className="lab">Product name:</label>
            <input
              type="text"
              className="inputstart"
              name="productname"
              value={formData.productname}
              onChange={handleInputChange}
            />
          </div>
          <div className="labelstart">
            <label className="lab">Product type:</label>
            <input
              type="text"
              className="inputstart"
              name="productype"
              value={formData.productype}
              onChange={handleInputChange}
            />
          </div>
          <div className="labelstart">
            <label className="lab">Select product image:</label>
            <input className="inputstart" type="file" name="pictures" onChange={handleFileChange} />
          </div>
          <button className="btn1" type="submit">Add product</button>
        </form>
      </div>
      
      <div> 
      

      
      {<Link className="datalink" to={'/getcategory'}>show your category</Link> }
      
      </div>
    </div>
  );
};

export default CategoryAdd;
