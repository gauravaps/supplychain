import React from 'react'
import { Link } from 'react-router-dom'

const AdminHome = () => {
  const token=localStorage.getItem('token')
  const adminname=localStorage.getItem('Adminname')
  const adminId=localStorage.getItem('adminid')
  return (
    <div>
      <p>Admin token:{token}</p>
      <p>Admin Name:{adminname}</p>
      <p>AdminId:{adminId}</p>
      <Link to={'/adminpassword'}>Change password</Link>
    </div>
  )
}

export default AdminHome