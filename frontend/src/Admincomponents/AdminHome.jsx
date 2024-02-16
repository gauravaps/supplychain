import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../commonComponent/Navbar'
import GetcategoryProduct from '../Category/GetcategoryProduct'

const AdminHome = () => {
  const navigate=useNavigate()
  
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