import * as types from "../constants/post.constants";
import api from "../api";
import { toast } from "react-toastify";

const createPost = ({body, imageUrl, userId}) => async (dispatch) => {
  dispatch({ type: types.CREATE_POST_REQUEST, payload: null });
  try {
    // For uploading file manually
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", content);
    // if (images && images.length) {
    //   for (let index = 0; index < images.length; index++) {
    //     formData.append("images", images[index]);
    //   }
    // }
    // const res = await api.post("/posts", formData);

    // Upload images using cloudinary already
    const res = await api.post("/posts", { body, imageUrl });

    dispatch({
      payload: res.data.data,
      type: types.CREATE_POST_SUCCESS,
    });
    dispatch(postActions.postsRequest(1,10, null, userId, null))
    toast.success("Post created");
  } catch (error) {
    dispatch({ type: types.CREATE_POST_FAILURE, payload: error });
  }
};
//postsRequest(1, 10, noddle, "abc", null)
const postsRequest =
  (pageNum = 1, limit = 10, query = null, ownerId = null, sortBy = null) =>
  async (dispatch) => {
    dispatch({ type: types.POST_REQUEST, payload: null });
    try {
      console.log(ownerId)
      let queryString = ""; 
      if (query) {
        queryString = `&title[$regex]=${query}&title[$options]=i`;
      }
      //queryString = `&title[$regex]=noddle&title[$options]=i`
      if (ownerId) {
        queryString = `${queryString}&owner=${ownerId}`;
      }
      //queryString = `&title[$regex]=noddle&title[$options]=i&owner=abc`
      let sortByString = "";
      if (sortBy?.key) {
        sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
      }
      const res = await api.get(
        `/posts?page=${pageNum}&limit=${limit}${queryString}${sortByString}`,
      );
      //"/posts?page=1&limit=10&title[$regex]=noddle&title[$options]=i"
      dispatch({
        type: types.POST_REQUEST_SUCCESS,
        payload: res.data.data.posts,
      });
    } catch (error) {
      dispatch({ type: types.POST_REQUEST_FAILURE, payload: error });
    }
  };

const getSinglePost = (postId) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_POST_REQUEST, payload: null });
  try {
    const res = await api.get(`/posts/${postId}`);
    dispatch({
      type: types.GET_SINGLE_POST_REQUEST_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_POST_REQUEST_FAILURE, payload: error });
  }
};

const updatePost = (postId, title, content, images) => async (dispatch) => {
  dispatch({ type: types.UPDATE_POST_REQUEST, payload: null });
  try {
    // let formData = new FormData();
    // formData.set("title", title);
    // formData.set("content", content);
    const res = await api.put(`/posts/${postId}`, { title, content, images });

    dispatch({
      payload: res.data.data,
      type: types.UPDATE_POST_SUCCESS,
    });
    toast.success("Post updated.");
  } catch (error) {
    dispatch({ type: types.UPDATE_POST_FAILURE, payload: error });
  }
};

const deletePost = (postId) => async (dispatch) => {
  dispatch({ type: types.DELETE_POST_REQUEST, payload: null });
  try {
    const res = await api.delete(`/posts/${postId}`);
    console.log(res);
    dispatch({
      payload: res.data,
      type: types.DELETE_POST_SUCCESS,
    });
    toast.success("Post deleted.");
  } catch (error) {
    dispatch({ type: types.DELETE_POST_FAILURE, payload: error });
  }
};

const createComment = (postId, body, userId) => async (dispatch) => {
  try {
    const res = await api.post(`/posts/${postId}/comments`, {
      body,
    });
    dispatch({
      type: types.CREATE_COMMENT_SUCCESS,
      payload: res.data.data,
    });
    dispatch(postActions.postsRequest(1,10, null, userId, null))

  } catch (error) {
    dispatch({ type: types.CREATE_COMMENT_FAILURE, payload: error });
  }
};

const createReaction =
  (reactionableType, reactionableId, reactionType) => async (dispatch) => {
    try {
    } catch (error) {}
  };

export const postActions = {
  createPost,
  postsRequest,
  getSinglePost,
  updatePost,
  deletePost,
  createComment,
  createReaction,
};
