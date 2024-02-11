import React, { useEffect } from 'react'
import {Routes,Route, useNavigate} from 'react-router-dom'
import AdminLogin from './Admincomponents/AdminLogin'
import AdminHome from './Admincomponents/AdminHome'
import axios from 'axios'

const App = () => {
  const token=localStorage.getItem('token')
  const navigate=useNavigate()

  useEffect(()=>{
    const gettoken=async()=>{
      try {
        const res =await axios.post("http://localhost:5000/api/tokencheck",{token:token})

        if(res.data.sts===0){
          console.log("Token received successfully!");
        }
        

      } catch (error) {
        if(error.response.data.sts===1){
          
          localStorage.removeItem('token')
          localStorage.removeItem('adminname')
          localStorage.removeItem('adminid')

          navigate('/adminlogin')  
        }
        console.log(error);
        
      }

    }
    gettoken()

  },[])

  //if no token is null in local storage..
  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token===null){
      navigate('/adminlogin') 

    }
  },[token])




  return (
    <div>
    
      <Routes>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/adminhome' element={<AdminHome/>}/>
      </Routes>


    </div>
  )
}

export default App