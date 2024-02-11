import React, { useEffect } from 'react'

import {toast,ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const ToastShow = ({msg,errortype,showToast}) => {
  
  const tostfy=()=>{
    toast[errortype](msg,{
      autoClose:3000
    })
  }

  useEffect(()=>{
    if(showToast){
      tostfy()
    }
  },[showToast])
  return (
    <ToastContainer/>
  )
}

export default ToastShow