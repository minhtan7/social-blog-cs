import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const AlertMsg = () => {
  return (
    <ToastContainer
      pauseOnHover
      newestOnTop={false}
      position="top-right"
      hideProgressBar={false}
    />
  );
};

export default AlertMsg;
