import * as api from "../api";
import {
  FETCH_POSTS,
  CREATE_POST,
  FETCH_POST_ID,
  UPDATE_POST,
  DELETE_POST,
  UPDATE_USER,
} from "../constants/actionType";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPost();
    dispatch({ type: FETCH_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getUserPost = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPost();
    console.log(data, "This is main data");
    const filteredData = data?.posts?.filter((item) => item.user._id == id);
    console.log(filteredData, "This is filtered Data");
    dispatch({ type: FETCH_POSTS, payload: filteredData });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostByID(id);
    dispatch({ type: FETCH_POST_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, updatedPost) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, updatedPost);
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    console.log(error);
  }
};

// export const toggleLike = (like) => async (dispatch) => {
//   try {
//     const { data } = await api.createBlog(like);
//     dispatch({ type: TOGGLE_LIKE, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const toggleLike = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.fetchPostByID(id);

    let updatedLikes;
    if (data.likes.includes(userId)) {
      updatedLikes = data.likes.filter((likeId) => likeId !== userId);
    } else {
      updatedLikes = [...data.likes, userId];
    }

    const updatedPost = await api.updatePost(id, { likes: updatedLikes });

    dispatch({ type: UPDATE_POST, payload: updatedPost.data });
    console.log("U liked the post Sucessfully");
  } catch (error) {
    console.log(error);
  }
};
export const toggleFollow = (id, userId) => async (dispatch) => {
  try {
    const { data } = await api.getUserById(id);

    let updatedFollow;
    if (data.followers.includes(userId)) {
      updatedFollow = data.followers.filter((followerId) => followerId !== userId);
    } else {
      updatedFollow = [...data.followers, userId];
    }

    const updatedUser = await api.updateUser(id, { followers: updatedFollow });

    await dispatch(toggleFollowing(userId, id));

    dispatch({ type: UPDATE_USER, payload: updatedUser.data });

    console.log("You followed the User successfully");
  } catch (error) {
    console.log(error);
  }
};

export const toggleFollowing = (id, userId) => async (dispatch) => {
  console.log("This function is Working");
  try {
    const { data } = await api.getUserById(id);

    let updatedFollow;
    if (data.following.includes(userId)) {
      updatedFollow = data.following.filter((Id) => Id !== userId);
    } else {
      updatedFollow = [...data.following, userId];
    }

    const updatedUser = await api.updateUser(id, { following: updatedFollow });

    dispatch({ type: UPDATE_USER, payload: updatedUser.data });
    console.log("Following data updated successfully");
  } catch (error) {
    console.log(error);
  }
};
