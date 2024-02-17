import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../commonComponent/Navbar'


const AdminHome = () => {
  
  
  const token=localStorage.getItem('token')
  const adminname=localStorage.getItem('adminname')
  const adminId=localStorage.getItem('adminid')





  
  return (
    <div>
      <Navbar/><br /><br />
      
      

      
      
    </div>
  )
}

export default AdminHome