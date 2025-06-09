import {
  FETCH_STORIES,
  CREATE_STORY,
  FETCH_STORY_ID,
  DELETE_STORY,
} from "../constants/actionType";

const initialState = {
  story: [],
  singleStory: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STORIES:
      return {
        ...state,
        story: action.payload,
      };

    case CREATE_STORY:
      return {
        ...state,
        story: [...state.story, action.payload],
      };

    case FETCH_STORY_ID:
      return {
        ...state,
        singleStory: action.payload,
      };

    case DELETE_STORY:
      return {
        ...state,
        story: state.story.filter(
          (story) => story._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};
