import React, { Fragment } from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
// import AdminLayout from "./layouts/AdminLayout"
// import PublicLayout from "./layouts/PublicLayout";
import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import { Container } from "react-bootstrap";
import PublicNavbar from "../components/PublicNavbar";
import AlertMsg from "./layouts/AlertMsg";
import ProfilePage from "../pages/ProfilePage";
import { useSelector } from "react-redux";

const PublicLayout = ()=>{
  return (
    <>
      <PublicNavbar/>
      <Container fluid style={{ padding: 0 }}>
        <AlertMsg />
        <Outlet/>
      </Container>
    </>
  );
}
const AdminLayout = ()=>{
  return (
    <>
      <PublicNavbar/>
      <Container fluid style={{ padding: 0 }}>
        <AlertMsg />
        <Outlet/>
      </Container>
    </>
  );
}


const AllRoutes = () => {
  const user = useSelector(state => state.auth.user)
  return (
    <Routes>
      <Route path="/" element={<PublicLayout/>} >
        <Route exact path="/auth" element={<AuthPage/>} />
        <Route exact path="/:name" element={<PrivateRoute>
          <ProfilePage/>
        </PrivateRoute>} />
        <Route  path="/" element={<HomePage/>} />
      </Route>
      <Route path="/admin" element={<AdminLayout/>} >
        <Route exact path="/admin/auth" element={<AuthPage/>} />
        <Route  path="/admin" element={<HomePage/>} />
      </Route>
      {/* <PrivateRoute path="/admin" /> */}
    </Routes>
  );
};
export default AllRoutes;
