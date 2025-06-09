import {
  FETCH_POSTS,
  CREATE_POST,
  FETCH_POST_ID,
  UPDATE_POST,
  DELETE_POST,
} from "../constants/actionType";

const initialState = {
  post: [],
  singlePost: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        post: action.payload,
      };

    case CREATE_POST:
      return {
        ...state,
        post: [...state.post, action.payload],
      };

    case FETCH_POST_ID:
      return {
        ...state,
        singlePost: action.payload,
      };

    case DELETE_POST:
      return {
        ...state,
        post: state.post.filter((post) => post._id !== action.payload._id),
      };

    case UPDATE_POST:
      return {
        ...state,
        post: state.post.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    default:
      return state;
  }
};
