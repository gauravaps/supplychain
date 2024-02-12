import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ResetpassLink = () => {
  const { resetToken } = useParams();

  //const [resetToken, setResetToken] = useState(rtoken);

  const [adminpassword, setadminpassword] = useState({
    password: "",
    resetToken: resetToken,
  });

  const handelchange = (e) => {
    const { name, value } = e.target;

    setadminpassword({ ...adminpassword, [name]: value });
  };

  const handelsubmit = async (e) => {
    e.preventDefault();


    try {
      const res = await axios.post(
        "http://localhost:5000/api/adminnewpass",
        adminpassword
      );


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
