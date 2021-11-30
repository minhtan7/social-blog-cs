import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Outlet } from "react-router-dom";

import AlertMsg from "./AlertMsg";
import PrivateRoute from '../PrivateRoute'
import PublicNavbar from "../../components/PublicNavbar";

import HomePage from "../../pages/HomePage";
import AuthPage from "../../pages/AuthPage";
import ProfilePage from "../../pages/ProfilePage";
import NotFoundPage from "../../pages/NotFoundPage";

const Public = () => {
  return (
    <>
      <Route exact path="/auth" element={<AuthPage/>} />
        <Route  path="/" element={<HomePage/>} />
    </>
  );
};

export default Public;
