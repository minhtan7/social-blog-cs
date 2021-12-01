import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  Nav,
  Form,
  Navbar,
  FormControl,
  NavDropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.css";

import logo from "../../assets/site-identity.png";
import { authActions } from "../../redux/actions";

const PublicNavbar = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(authActions.getCurrentUser())
  }, [])
  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const authLinks = (
    <Nav>
      <Link to={`/${user?.displayName}`}>
        <div className="nav-icon">
          <FontAwesomeIcon icon="user" size="lg" />
        </div>
      </Link>
      <Link to="/create">
        <div className="nav-icon">
          <FontAwesomeIcon icon={"plus"} size="lg" />
        </div>
      </Link>
      <Link to="/messages">
        <div className="nav-icon">
          <FontAwesomeIcon icon={["fab", "facebook-messenger"]} size="lg" />
        </div>
      </Link>
      <Link to="/notificaions">
        <div className="nav-icon">
          <FontAwesomeIcon icon="bell" size="lg" />
        </div>
      </Link>
      <NavDropdown
        alignRight
        id="dropdown-basic"
        title={
          <div className="nav-icon">
            <FontAwesomeIcon icon="cog" size="lg" />
          </div>
        }
      >
        <NavDropdown.Item href="action/3.1">Loi V Tran</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleLogout} href="#action/3.4">
          Log out
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );

  const publicLinks = (
    <Nav>
      <Link  to="/auth" >
        <FontAwesomeIcon icon="registered" size="sm" /> Register
      </Link>
      <Link  to="/auth">
        <FontAwesomeIcon icon="sign-in-alt" size="sm" /> Login
      </Link>
    </Nav>
  );

  return (
    <Navbar bg="light" expand="lg" className="sticky-top box-shadow">
      <Navbar.Brand as={Link} to="/" className="mr-auto ">
        <img src={logo} alt="coderbook" width="50px" />
      </Navbar.Brand>
      <Form inline className="ml-5 w-100">
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2 rounded-pill border-0 rounded-md search-bar"
        />
      </Form>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
