import React from "react";

import { Row, Col, Nav, Button, Container, ButtonGroup } from "react-bootstrap";

import "./style.css";

import Composer from "../../components/Composer/Composer";

export default function ProfilePage() {
  return (
    <div>
      <Row className="centered hero">
        <Container className="centered flex-column">
          <img
            alt="lighthouse"
            className="position-relative img-fluid rounded-md"
            src="https://images.unsplash.com/photo-1507725914440-e1e434774828?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&w=2389&q=100"
          />
          <div className="centered position-relative">
            <img
              alt="profile"
              className="position-absolute rounded-circle cover-profile-photo"
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
            />
          </div>
        </Container>
        <hr className="w-75" />
      </Row>
      <Row className="rounded profile-nav bg-white">
        <Container className="centered">
          <Container>
            <Nav
              activeKey="/posts"
              onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/posts">
                  Posts
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/about">
                  About
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/friends">
                  Friends
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/photos">
                  Photos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link className="text-secondary" href="/more">
                  More
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Container>

          <Container>
            <ButtonGroup
              className="d-flex p-2 align-items-between justify-content-between"
              aria-label="First group"
            >
              <Button variant="light" className="rounded-sm mr-1">
                Edit
              </Button>
              <Button variant="light" className="rounded-sm mr-1">
                View As
              </Button>
              <Button variant="light" className="rounded-sm mr-1">
                Search
              </Button>
              <Button variant="light" className="rounded-sm mr-1">
                Settings
              </Button>
            </ButtonGroup>
          </Container>
        </Container>
      </Row>
      <Row className="mt-3 profile-content">
        <Container className="d-flex">
          <Col xs={5} className="d-flex justify-content-end">
            <h1>Sidebar</h1>
          </Col>
          <Col xs={7} className="posts-col">
            <Composer />
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
            <h1>Post</h1>
          </Col>
        </Container>
      </Row>
    </div>
  );
}
