import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ResetpassLink = () => {


  const { resetToken } = useParams();

  const apiUrl = `http://localhost:5000/api/adminnewpass/${resetToken}`;

  useEffect(() => {
  
    const apiUrl = `http://localhost:5000/api/adminnewpass/${resetToken}`;
  }, [resetToken]);
  



  

  const [adminpassword, setadminpassword] = useState({
    password: "",
    
  });

  const handelchange = (e) => {
    const { name, value } = e.target;

    setadminpassword({ ...adminpassword, [name]: value });
  };

  const handelsubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await axios.post( apiUrl, adminpassword );

      if (res.data.sts === 0) {
        console.log("password upadated");
      }

      console.log(res);
      


    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <div className="login">
          <h2>
            <span>Enter your new password</span>
          </h2>
        </div>

        <form className="formstart" onSubmit={handelsubmit}>
          <div className="labelstart">
            <label className="lab">Email ID:</label>

            <input
              className="inputstart"
              type="password"
              name="password"
              placeholder=" Enter your new password"
              onChange={handelchange}
              value={adminpassword.password}
            />
          </div>
          <button type="submit" className="btn1">
            update password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetpassLink;
