import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import AlertMsg from "./AlertMsg";
import PrivateRoute from '../PrivateRoute'
import PublicNavbar from "../../components/PublicNavbar";

import HomePage from "../../pages/HomePage";
import AuthPage from "../../pages/AuthPage";
import ProfilePage from "../../pages/ProfilePage";
import NotFoundPage from "../../pages/NotFoundPage";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container fluid style={{ padding: 0 }}>
        <AlertMsg />
        {/* <Routes> */}
          <Route exact path="/admin" element={<HomePage/>} />
          <Route exact path="/admin/auth" element={<AuthPage/>} />
          {/* <PrivateRoute path="/admin/:id" element={<ProfilePage/>} /> */}
          <Route element={<NotFoundPage/>} />
        {/* </Routes> */}
      </Container>
    </>
  );
};

export default PublicLayout;
