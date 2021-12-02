import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { postActions } from "../../redux/actions";

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
  return <img alt="profile" className="rounded-circle" src={props.url} />
};

/* STEP 4 */
const CommentForm = (props) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch()
 const handleOnChange= (e)=>{
   setComment(e.target.value)
  }
  const user = useSelector(state => state.auth.user)
  const otherUser = useSelector(state => state.user.otherUser)


  const handleSubmit = (e) => {
    e.preventDefault();
    if(props.type ==="user" && user.displayName===otherUser?.displayName){
      dispatch(postActions.createComment(props.postId, comment, user._id));
    } else if( props.type ==="user" && user.displayName!==otherUser?.displayName){
      dispatch(postActions.createComment(props.postId, comment, otherUser?._id));
    } else if (props.type === "home"){
      dispatch(postActions.createComment(props.postId, comment, null));
    }
};
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Col className="d-flex">
          <Form.Control
            size="sm"
            type="text"
            placeholder="Write a comment..."
            className="border-0 rounded-md bg-light"
            onChange={handleOnChange}
          />
        </Col>
      </Form.Row>
    </Form>
  );
};

const Comment = ({ body, owner }) => {
  const user = useSelector(state => state.auth.user)
  const [edit, setEdit] = useState(body)
  const [show, setShow] = useState(false)
  const openEdit =()=>{
    setShow(!show)
  }
  const handleKeyDown =(e)=>{
    if(e.which===13){
      console.log(edit)
    }
  }
  return (
    <ListGroupItem className="justify-content-start border-bottom-0 pr-0 py-0">
      <Avatar url={owner.avatarUrl} />
      <div className="col comment-bubble-wrap">
        <div className="comment-bubble">
          <div className="font-weight-bold">{owner.name}</div>
          <p>{body}</p>
          {
            user.displayName===owner.displayName? (
            <div className="edit-icon" >
              <FontAwesomeIcon icon="edit" size="sm" onClick={openEdit}/>
              <FontAwesomeIcon icon="times" size="sm" />
            </div>
            ) : null
          }
          <div className={show?"edit-form show":"edit-form"}>
            <input value={edit} onChange={(e)=>setEdit(e.target.value)} onKeyDown={handleKeyDown}/>
          </div>
          
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

function PostHeader({userWhoCreatedPost}) {
  console.log(userWhoCreatedPost)
  return (
    <div className="d-flex align-items-center p-3">
      <Avatar url={userWhoCreatedPost.avatarUrl}  />
      <h3 className="font-weight-bold ml-3">
        {userWhoCreatedPost.name}
      </h3>
    </div>
  );
}

export default function Post(props) {
  return (
    <Card className="p-3 mb-3 rounded">
      <PostHeader userWhoCreatedPost={props.owner} />
      {props.body}
      <Card.Img
        variant="top"
        src={`${props.imageUrl}`}
      />
      <PostReactions />
      <hr className="my-1" />
      <PostActions />
      <hr className="mt-1" />
      <PostComments comments={props.comments} />
      <CommentForm postId={props._id} type={props.type}/>
    </Card>
  );
}
