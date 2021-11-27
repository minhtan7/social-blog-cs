import React from "react";
import {
  Col,
  Form,
  Card,
  Button,
  ListGroup,
  ButtonGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./style.css";

import avatar from "../../assets/avatar.png";

const COMMENTS = [
  {
    id: 1,
    body: `Loi you're such a talented developer. I hope one day I can be just like you. Hihi =)`,
    user: {
      name: "Charles Lee",
      avatarUrl:
        "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p480x480/13924881_10105599279810183_392497317459780337_n.jpg?_nc_cat=109&ccb=3&_nc_sid=7206a8&_nc_ohc=uI6aGTdf9vEAX8-Aev9&_nc_ht=scontent.fsgn5-6.fna&tp=6&oh=e8b18753cb8aa63937829afe3aa916a7&oe=6064C685",
    },
  },
  {
    id: 2,
    body: `Thank you...`,
    user: {
      name: "Loi Tran",
      avatarUrl:
        "https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.0-1/14633014_10154745913714359_6100717154322258576_n.jpg?_nc_cat=105&ccb=3&_nc_sid=7206a8&_nc_ohc=PO1d3X9U7egAX9IFy1u&_nc_oc=AQlNWL-YG7EdcZYBqWlyn2vCvGxKMG6jXMOdGl-GUkRLMAxUZPnM2mMfh_mjayYJMyA&_nc_ht=scontent.fsgn5-2.fna&oh=abda95a6abf3b5883dbd6078cd8f36a3&oe=6061BFC6",
    },
  },
  {
    id: 3,
    body: `SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! SO talented! 
    SO talented! 
    SO talented! 
    SO talented! `,
    user: {
      name: "Charles Lee",
      avatarUrl:
        "https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p480x480/13924881_10105599279810183_392497317459780337_n.jpg?_nc_cat=109&ccb=3&_nc_sid=7206a8&_nc_ohc=uI6aGTdf9vEAX8-Aev9&_nc_ht=scontent.fsgn5-6.fna&tp=6&oh=e8b18753cb8aa63937829afe3aa916a7&oe=6064C685",
    },
  },
];

const Avatar = (props) => {
  return <img alt="profile" className="rounded-circle" src={avatar} />;
};

/* STEP 4 */
const CommentForm = () => {
  return (
    <Form>
      <Form.Row>
        <Col className="d-flex">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Write a comment..."
            className="border-0 rounded-md bg-light"
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

const Comment = ({ body, user }) => {
  return (
    <ListGroupItem className="justify-content-start border-bottom-0 pr-0 py-0">
      <Avatar url={user.avatarUrl} />
      <div className="col">
        <div className="comment-bubble">
          <div className="font-weight-bold">{user.name}</div>
          <p>{body}</p>
        </div>
      </div>
    </ListGroupItem>
  );
};

const PostComments = (props) => {
  return (
    <Card.Body>
      <ListGroup className="list-group-flush">
        {props.comments.map((c) => (
          <Comment key={c.id} {...c} />
        ))}
      </ListGroup>
    </Card.Body>
  );
};

const POST_ACTIONS = [
  { title: "Like", icon: "thumbs-up" },
  { title: "Comment", icon: "comment" },
  { title: "Share", icon: "share" },
];

const PostActionButton = ({ title, icon }) => {
  return (
    <Button className="bg-light bg-white text-dark border-0">
      {" "}
      <FontAwesomeIcon
        size="lg"
        icon={icon}
        color="black"
        className="mr-2 action-icon"
      />
      {title}
    </Button>
  );
};

const PostActions = () => {
  return (
    <ButtonGroup aria-label="Basic example">
      {POST_ACTIONS.map((a) => {
        return <PostActionButton key={a.title} {...a} />;
      })}
    </ButtonGroup>
  );
};

const PostReactions = () => {
  return (
    <div className="d-flex justify-content-between my-2 mx-3">
      <p className="mb-0">Vinh Nguyen, Bitna Kim and 21 others</p>
      <p className="mb-0">20 comments</p>
    </div>
  );
};

function PostHeader() {
  return (
    <div className="d-flex align-items-center p-3">
      <Avatar url="https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.0-1/p480x480/13924881_10105599279810183_392497317459780337_n.jpg?_nc_cat=109&ccb=3&_nc_sid=7206a8&_nc_ohc=uI6aGTdf9vEAX8-Aev9&_nc_ht=scontent.fsgn5-6.fna&tp=6&oh=e8b18753cb8aa63937829afe3aa916a7&oe=6064C685" />
      <h3 className="font-weight-bold ml-3">
        Charles Lee
      </h3>
    </div>
  );
}

export default function Post() {
  return (
    <Card className="p-3 mb-3 shadow rounded-md">
      <PostHeader/>
      <Card.Img
        variant="top"
        src="https://images.unsplash.com/photo-1529231812519-f0dcfdf0445f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFsZW50ZWR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
      />
      <PostReactions />
      <hr className="my-1" />
      <PostActions />
      <hr className="mt-1" />
      <PostComments comments={COMMENTS} />
      <CommentForm />
    </Card>
  );
}
