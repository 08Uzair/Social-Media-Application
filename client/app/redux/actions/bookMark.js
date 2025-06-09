import * as api from "../api";
import {
  FETCH_BOOKMARKS,
  CREATE_BOOKMARK,
  FETCH_BOOKMARK_ID,
  DELETE_BOOKMARK,
} from "../constants/actionType";

export const getBookMark = () => async (dispatch) => {
  try {
    const { data } = await api.fetchBookMark();
    dispatch({ type: FETCH_BOOKMARKS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserBookMark = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchBookMark();
    const filteredData = data?.marks?.filter((item) => item.user._id === id);
    return filteredData; // Return the filtered data
  } catch (error) {
    console.log(error);
  }
};


export const addBookMark = (post) => async (dispatch) => {
  try {
    const { data } = await api.createBookMark(post);
    dispatch({ type: CREATE_BOOKMARK, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getBookMarkById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchBookMarkByID(id);
    dispatch({ type: FETCH_BOOKMARK_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// export const updatePost = (id, updatedPost) => async (dispatch) => {
//   try {
//     const { data } = await api.updatePost(id, updatedPost);
//     dispatch({ type: UPDATE_BOOKMARK, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const removeBookMark = (id) => async (dispatch) => {
  try {
    await api.deleteBookMark(id);
    dispatch({ type: DELETE_BOOKMARK, payload: id });
  } catch (error) {
    console.log(error);
  }
};
