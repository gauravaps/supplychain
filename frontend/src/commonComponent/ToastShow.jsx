import React, { useEffect } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastShow = ({ msg, errortype, showToast }) => {
  const tostfy = () => {
    toast[errortype](msg, {
      position: "top-center",
      autoClose: 3000,

      theme: "dark",
    });
  };

  useEffect(() => {
    if (showToast) {
      tostfy();
    }
  }, [showToast]);
  return <ToastContainer />;
};

export default ToastShow;
