import axios from "axios";
import React, { useState } from "react";
import ToastShow from "../commonComponent/ToastShow";

const AdminPassword = () => {
  const [msg, setmsg] = useState("");
  const [errortype, seterrortype] = useState("");
  const [showToast, setshowToast] = useState(false);

  const adminname = localStorage.getItem("adminname");
  const [changepassword, setchangepassword] = useState({
    oldpassword: "",
    password: "",
  });

  //set handelchange value and name property
  const handelchange = (e) => {
    const { name, value } = e.target;

    setchangepassword({ ...changepassword, [name]: value });
  };

  //handel submit function.
  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      const adminid = localStorage.getItem("adminid");
      const url = `http://localhost:5000/api/changepass/${adminid}`;

      const res = await axios.patch(url, changepassword);
      if (res.data.sts === 0) {
        setshowToast(true);
        seterrortype("success");
        setmsg(res.data.message);

        setTimeout(() => {
          setshowToast(false);
        }, 3000);

        //set again empty input field 
        setchangepassword({ oldpassword: "", password: "" });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.sts) {
        setshowToast(true);
        seterrortype("error");
        setmsg(error.response.data.message);

        setTimeout(() => {
          setshowToast(false);
        }, 3000);
      }
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <div className="login">
          <h2>
            <span>change Admin password:{adminname}</span>
          </h2>
        </div>
        {<ToastShow msg={msg} errortype={errortype} showToast={showToast} />}
        <form className="formstart" onSubmit={handelsubmit}>
          <div className="labelstart">
            <label className="lab">Old password:</label>
            <input
              className="inputstart"
              type="password"
              name="oldpassword"
              placeholder=" enter ypur old password"
              onChange={handelchange}
              value={changepassword.oldpassword}
            />
          </div>

          <div className="labelstart">
            <label className="lab">New Password:</label>
            <input
              className="inputstart"
              type="password"
              name="password"
              placeholder="enter your new password"
              onChange={handelchange}
              value={changepassword.password}
            />
          </div>

          <button className="btn1" type="submit">
            Change password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPassword;
