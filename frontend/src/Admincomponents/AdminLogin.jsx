import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../index.css";
import ToastShow from '../commonComponent/ToastShow';


const AdminLogin = () => {

    const navigate=useNavigate()
    const[msg,setmsg]=useState('')
    const[errortype,seterrortype]=useState('');
    const[showToast,setshowToast]=useState(false)

    const [userdata, setuserdata] = useState({
        email: "",
        password: "",
      });
      
//set handelchange value and name property
      const handelchange = (e) => {
        const { name, value } = e.target;
        setuserdata({ ...userdata, [name]: value });
      };
   
      const handelsubmit = async (e) => {
        e.preventDefault();

        try {
          const res = await axios.post("http://localhost:5000/api/adminlogin", userdata);

          if(res.data.sts===0){
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('adminname',res.data.fname)
            localStorage.setItem('adminid',res.data.adminid)
            navigate('/adminhome')
          }
          

        } catch (error) {
          if (error.response && error.response.data && error.response.data.sts) {
            setshowToast(true)
            setmsg(error.response.data.message)
            seterrortype('error')
            setTimeout(()=>{
              setshowToast(false)

            },3000)
            
            //set again empty input field
            setuserdata({email:'',password:''})


            }

          console.error(error);
          
          }
          
          
        
        

      }






  return (
    <div className="container">

    <div className="heading">
      <div className="login">
    <h2>
        <span>Admin Login please</span>
    </h2>
</div>
    <ToastShow msg={msg} errortype={errortype} showToast={showToast}/>
      <form className="formstart" onSubmit={handelsubmit}>
        <div className="labelstart">
          <label className="lab">Email:</label>
          <input
            className="inputstart"
            type="email"
            name="email"
            placeholder=" enter ypur email"
            onChange={handelchange}
            value={userdata.email}
          />
        </div>

        <div className="labelstart">
          <label className="lab">Password:</label>
          <input
            className="inputstart"
            type="password"
            name="password"
            placeholder="enter your password"
            onChange={handelchange}
            value={userdata.password}
          />
        </div>

        <button className="btn1" type="submit">
          Login
        </button>

      </form>
      
      
      </div>
      </div>

  )
}

export default AdminLogin;