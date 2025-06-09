import * as api from "../api";
import {
  CREATE_STORY,
  DELETE_STORY,
  FETCH_STORIES,
  FETCH_STORY_ID,
} from "../constants/actionType";

export const getStory = () => async (dispatch) => {
  try {
    const { data } = await api.fetchStory();
    dispatch({ type: FETCH_STORIES, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getUserStory = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchStory();
    const filteredData = data?.marks?.filter((item) => item.user._id === id);
    return filteredData; // Return the filtered data
  } catch (error) {
    console.log(error);
  }
};

export const addStory = (story) => async (dispatch) => {
  try {
    const { data } = await api.createStory(story);
    dispatch({ type: CREATE_STORY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const getStoryById = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchStoryByID(id);
    dispatch({ type: FETCH_STORY_ID, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const removeStory = (id) => async (dispatch) => {
  try {
    await api.deleteStory(id);
    dispatch({ type: DELETE_STORY, payload: id });
  } catch (error) {
    console.log(error);
  }
};
