import axios from "axios";
import React, { useState } from "react";
import ToastShow from "../commonComponent/ToastShow";


const Forgetpassword = () => {

  

  const [msg, setmsg] = useState("");
  const [errortype, seterrortype] = useState("");
  const [showToast, setshowToast] = useState(false);

  const [adminemail, setadminemail] = useState({
    email: "",
  });

  const handelchange = (e) => {
    const { name, value } = e.target;

    setadminemail({ ...adminemail, [name]: value });
  };
  const handelsubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/adminpassreset",
        adminemail
      );
      if (res.data.sts === 0) {
        localStorage.setItem('resettoken',res.data.resettoken)
        setshowToast(true);
        setmsg(res.data.message);
        seterrortype("success");
        setTimeout(() => {
          setshowToast(false);
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.sts) {
        setshowToast(true);
        setmsg(error.response.data.message);
        seterrortype("error");
        setTimeout(() => {
          setshowToast(false);
        }, 3000);

        setadminemail({email:''})
      }
    }
  };

  return (
    <div className="container">
      <div className="heading">
        <div className="login">
          <h2>
            <span>Forget admin Password</span>
          </h2>
        </div>

        <ToastShow msg={msg} errortype={errortype} showToast={showToast} />

        <form action="" className="formstart" onSubmit={handelsubmit}>
          <div className="labelstart">
            <label className="lab">Email ID:</label>
            <input
              className="inputstart"
              type="email"
              name="email"
              placeholder=" Enter your email Id here"
              onChange={handelchange}
              value={adminemail.email}
            />
          </div>
          <button type="submit" className="btn1">
            send verification link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgetpassword;
