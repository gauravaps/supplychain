import React from 'react'

const AdminHome = () => {
  const token=localStorage.getItem('token')
  const adminname=localStorage.getItem('Adminname')
  const adminId=localStorage.getItem('adminid')
  return (
    <div>
      <p>Admin token:{token}</p>
      <p>Admin Name:{adminname}</p>
      <p>AdminId:{adminId}</p>
    </div>
  )
}

export default AdminHome