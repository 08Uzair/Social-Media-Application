import {
  FETCH_BOOKMARKS,
  CREATE_BOOKMARK,
  FETCH_BOOKMARK_ID,
  DELETE_BOOKMARK,
} from "../constants/actionType";

const initialState = {
  bookmark: [],
  singleBookMark: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKMARKS:
      return {
        ...state,
        bookmark: action.payload,
      };

    case CREATE_BOOKMARK:
      return {
        ...state,
        bookmark: [...state.bookmark, action.payload],
      };

    case FETCH_BOOKMARK_ID:
      return {
        ...state,
        singleBookMark: action.payload,
      };

    case DELETE_BOOKMARK:
      return {
        ...state,
        bookmark: state.bookmark.filter(
          (bookmark) => bookmark._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
